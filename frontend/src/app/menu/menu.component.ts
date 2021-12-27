import { Component, OnInit } from '@angular/core';

import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
  }

  changeState(tipo:Number){
    //console.log(tipo)
    this.websocketService.changeState(tipo)
  }

}
