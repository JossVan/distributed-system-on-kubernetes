import { Component, OnInit } from '@angular/core';

import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  listaLocations:any;

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(){
    this.webSocketService.getConsulta2$().subscribe((data) => {
      //console.log(val)
      if(data != null){
        if(data.length !=0){
          this.listaLocations = data
        }
      }
    })
  }

}
