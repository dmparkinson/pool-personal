import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Bitacora } from '../interfaces/bitacora';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private URL = environment.host;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar bitacora
  list(mesInicio:string, mesFinal:string): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>(`${this.URL}/bitacora/filtro/${mesInicio}/${mesFinal}`);
  }

  bitacoraActualizacion(): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>(`${this.URL}/bitacora/actualizacion/`);
  }


}