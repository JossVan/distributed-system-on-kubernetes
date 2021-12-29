import { Component, OnInit } from '@angular/core';

import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {

  listaPersonas: any

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(){
    this.webSocketService.getConsulta1$().subscribe( (data) => {
      if (data != null){
        this.listaPersonas = data
      }
    })
  }
}
