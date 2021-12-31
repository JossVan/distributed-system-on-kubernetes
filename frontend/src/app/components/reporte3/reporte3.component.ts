import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {

  single:any[] = [];

  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition:LegendPosition = LegendPosition.Right;

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getInfo(){
    this.webSocketService.getConsulta3$().subscribe( (data)=>{
      if(data!=null){
        if(data.length != 0){ 
          // {location: "", valor: x}
          var arr = []
          for(const x of data){
            var nuevo = {
              'name': x.location,
              'value': x.valor
            }
            arr.push(nuevo)
          }
          this.single = arr
        }
      }
    })
  }

}
