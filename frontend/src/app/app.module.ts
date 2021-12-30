import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { InicioComponent } from './inicio/inicio.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { Reporte1Component } from './components/reporte1/reporte1.component';
import { Reporte2Component } from './components/reporte2/reporte2.component';
import { Reporte3Component } from './components/reporte3/reporte3.component';
import { Reporte4Component } from './components/reporte4/reporte4.component';
import { Reporte5Component } from './components/reporte5/reporte5.component';
import { Reporte6Component } from './components/reporte6/reporte6.component';
import { PersonaComponent } from './components/persona/persona.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list' // para listar los reportes de personas
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LocationComponent } from './components/location/location.component'


// se agrega la configuracion del socket io, como url se envia el socket-server que envia/recibe informacion
const config: SocketIoConfig = { url:"application-service:8080", options: {}}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    InicioComponent,
    Reporte1Component,
    Reporte2Component,
    Reporte3Component,
    Reporte4Component,
    Reporte5Component,
    Reporte6Component,
    PersonaComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatListModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
