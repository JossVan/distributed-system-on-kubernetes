import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

  estado:Number;

  constructor(private socket: Socket) { 
    this.estado = 1
  }

  // estados que controlan que reporte se va a mostrar en la pantalla de inicio
  changeState(estado:Number){
    this.estado = estado
  }

  getSocketPrueba(){
    this.socket.emit("getPrueba", {mensaje: "envio de mensaje desde cliente"})
    this.socket.on("envio-datos", (arg1:any) => {
      console.log("mensaje recibido desde el server: ", arg1)
    })
  }

  // retorna la lista completa de las personas listadas en mongo
  public getConsulta1$():Observable<any>{
    return new Observable(observer => {
      try {
        this.socket.on('result1', (data:JSON) => {
          observer.next(data)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  // retorna una lista tipo [{location:" ", valor: 0}, {...}]
  // con el top 3 de lugares
  public getConsulta2$():Observable<any>{
    return new Observable(observer => {
      try {
        this.socket.on('result2', (data:JSON) => {
          observer.next(data)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  // retorna una lista tipo [{location:" ", valor: 0}, {...}]
  // con todos los departamentos que tienen 1 dosis
  public getConsulta3$():Observable<any>{
    return new Observable(observer => {
      try {
        this.socket.on('result3', (data:JSON) => {
          observer.next(data)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  // retorna una lista tipo [{location:" ", valor: 0}, {...}]
  // con todos los departamentos que tienen 2 dosis
  public getConsulta4$():Observable<any>{
    return new Observable(observer => {
      try {
        this.socket.on('result4', (data:JSON) => {
          observer.next(data)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  // retorna una lista de las 5 ultimas personas registradas en redis
  public getConsulta5$():Observable<any>{
    return new Observable(observer => {
      try {
        this.socket.on('result5', (data:JSON) => {
          observer.next(data)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  // Retorna un json con los rangos de las edades
  public getConsulta6$():Observable<any>{
    return new Observable(observer => {
      try { 
        //consulta 4
        this.socket.on('result6', (data:JSON) => {
          observer.next(data)
        })

        this.socket.on('disconnect', ()=>{
          observer.complete()
        })

        this.socket.on('error', (e:any)=>{
          observer.error(e)
        })
        
        this.socket.on('connect_error', (e:any)=>{
          observer.error(e)
        })

      } catch (error) {
        observer.error(error)
      }
    })
  }

}
