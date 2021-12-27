import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  banderaRecop = true
  banderaTopAreas = false
  banderaUltimasPer = false
  banderaVac1 = false
  banderaVac2 = false
  banderaEdades = false

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    const obs$ = interval(1000);

    obs$.subscribe((d) => {
      // revisar estado
      this.changeState()
    })

  }


  ngOnDestroy(): void {
    
  }

  changeState(){
    var estado = this.websocketService.estado
      if (estado==1){
        this.banderaRecop = true
        this.banderaTopAreas = false
        this.banderaUltimasPer = false
        this.banderaVac1 = false
        this.banderaVac2 = false
        this.banderaEdades = false
      }else if(estado==2){
        this.banderaRecop = false
        this.banderaTopAreas = true
        this.banderaUltimasPer = false
        this.banderaVac1 = false
        this.banderaVac2 = false
        this.banderaEdades = false
      }else if(estado==3){
        this.banderaRecop = false
        this.banderaTopAreas = false
        this.banderaUltimasPer = false
        this.banderaVac1 = true
        this.banderaVac2 = false
        this.banderaEdades = false
      }else if(estado==4){
        this.banderaRecop = false
        this.banderaTopAreas = false
        this.banderaUltimasPer = false
        this.banderaVac1 = false
        this.banderaVac2 = true
        this.banderaEdades = false
      }else if(estado==5){
        this.banderaRecop = false
        this.banderaTopAreas = false
        this.banderaUltimasPer = true
        this.banderaVac1 = false
        this.banderaVac2 = false
        this.banderaEdades = false
      }else{
        this.banderaRecop = false
        this.banderaTopAreas = false
        this.banderaUltimasPer = false
        this.banderaVac1 = false
        this.banderaVac2 = false
        this.banderaEdades = true
      }
  }
}
