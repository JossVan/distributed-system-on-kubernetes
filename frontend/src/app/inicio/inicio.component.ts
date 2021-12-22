import { InformacionService } from './../informacion.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  init : string;
  constructor(private info: InformacionService) {
    info.messages.subscribe(msg => {
      console.log("Response from websocket: " + msg);
    });
  }

  ngOnInit(): void {
    this.sendMsg()
  }
  private message = {
    author: "tutorialedge",
    message: "this is a test message"
  };

  sendMsg() {
    console.log("new message from client to websocket: ", this.message);
    this.info.messages.next(this.message);

  }
}
