import { Component, OnInit } from '@angular/core';

import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.css']
})
export class Reporte5Component implements OnInit {

  listaPersonas: any

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(){
    this.webSocketService.getConsulta5$().subscribe( (data) => {
      if (data != null){
        this.listaPersonas = data
      }
    })
  }
}
