import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Transaccion } from '../interfaces/transaccion';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private URL = environment.host;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar transaccion
  list(): Observable<Transaccion[]>{
    return this.http.get<Transaccion[]>(`${this.URL}/transaccion`);
  }

  // Obtener un transaccion utililizando su ID
  get(id:number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.URL}/transaccion/${id}/`);
  }
  
  // Crear un nuevo transaccion utilizando la interface transaccion
  add(transaccion:Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(`${this.URL}/transaccion/crear/`, transaccion);
  }
  // Editar una transaccion, aqui se elimina tambien
  edit(id:number,transaccion:Transaccion): Observable<Transaccion> {
    return this.http.put<Transaccion>(`${this.URL}/transaccion/actualizar/${id}`, transaccion);
  }
}


