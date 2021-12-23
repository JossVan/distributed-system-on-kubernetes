import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client'

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class InformacionService extends WebsocketService {

  socket;
  constructor(private http: HttpClient) {
    super(http)
    this.socket = io('http://localhost:8080',
    {
     secure: true,
     rejectUnauthorized: false,
     reconnect: true,
     transports: ['polling','websocket'] })
  }

  enviarmensaje(mensaje:string){
    console.log("Enviando mensaje ", mensaje)
    this.socket.emit("new-message", mensaje)
  }

  obtener(): Observable<any>{
    return new Observable(observer =>{
      this.socket.on('message-received', (data) =>{
        observer.next(data)
      });
      return ()=>{};
    });
  }
}
