import { InformacionService } from './../informacion.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  init : string;
  mensaje : string ="raioz";
  conexion;
  constructor(private info: InformacionService) {

  }

  ngOnInit(): void {
    console.log("pasó por inicio")
    this.conexion = this.info.obtener().subscribe(mensaje=>{
      console.log("mensaje recibido ",mensaje)
    })
  }


  sendMsg(event: Event) {
      console.log("Click", this.mensaje);
      this.info.enviarmensaje(this.mensaje)

  }
}
