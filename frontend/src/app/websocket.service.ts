import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {


  constructor( public _http: HttpClient ) {
  }

  public get( url, token: string ): Observable<any> {
    const headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Api-Token': token
    } );

    return this._http.get( url, { headers: headers } );
  }

  public post( url, params, token? ): Observable<any> {
    const headers = ! ! token ? new HttpHeaders( {
      'Content-Type': 'application/json',
      'Api-Token': token
    } ) : new HttpHeaders( { 'Content-Type': 'application/json' } );

    const body = JSON.stringify( params );

    return this._http.post( url, body, { headers: headers } );
  }

  public delete( url, token ): Observable<any> {
    const headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Api-Token': token
    } );
    return this._http.delete( url, { headers: headers } );
  }

}
