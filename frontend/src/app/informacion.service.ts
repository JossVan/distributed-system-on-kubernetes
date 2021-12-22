import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


const CHAT_URL = "ws://localhost:8080";

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL)
    .pipe(
      map(
        (response: MessageEvent): Message => {
          let data = JSON.parse(response.data);
          return {
            author: data.author,
            message: data.message
          };
        }
      )
    )
  }
}
