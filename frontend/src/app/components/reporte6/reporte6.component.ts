import { Component, OnInit } from '@angular/core';

import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-reporte6',
  templateUrl: './reporte6.component.html',
  styleUrls: ['./reporte6.component.css']
})
export class Reporte6Component implements OnInit {
  single = [
    {
      "name": "Niños",
      "value": 0
    },
    {
      "name": "Adolescentes",
      "value": 0
    },
    {
      "name": "Jovenes",
      "value": 0
    },
    {
      "name": "Adultos",
      "value": 0
    },
    {
      "name": "Tercera Edad",
      "value": 0
    }
  ];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Edades';
  showYAxisLabel = true;
  yAxisLabel = 'Vacunados';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.getInfo()
  }

  onSelect(event:any) {
    console.log(event);
  }

  getInfo(){
    this.webSocketService.getConsulta6$().subscribe( (data)=>{
      if(data != null){
        this.single[0].value = data.ninos==null? 0 : data.ninos
        this.single[1].value = data.adolescentes==null? 0 : data.adolescentes
        this.single[2].value = data.jovenes==null? 0 : data.jovenes
        this.single[3].value = data.adultos==null? 0 : data.adultos
        this.single[4].value = data.vejez==null? 0 : data.vejez

        this.single = [...this.single]
      }
    })
  }

}
