import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Avance } from '../interfaces/avance';

@Injectable({
  providedIn: 'root'
})
export class AvanceService {
  private URL = environment.host;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar avance
  list(): Observable<Avance[]>{
    return this.http.get<Avance[]>(`${this.URL}/avance`);
  }

  // Obtener un avance utililizando su ID
  get(id:number): Observable<Avance> {
    return this.http.get<Avance>(`${this.URL}/avance/${id}/`);
  }
  
  // Crear un nuevo avance utilizando la interface Avance
  add(avance:FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.URL}/avance/crear/`, avance,)
  }
  
  // Editar un avance, aqui se elimina tambien
  edit(id:number,avance:FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.URL}/avance/actualizar/${id}`, avance);
  }

  //Eliminar un avance
  delete(id:number): Observable<object> {
    return this.http.delete<object>(`${this.URL}/avance/${id}`)
  }


  //Obtener una file
  getFile(fileName:String): Observable<Object> {
    return this.http.get<Object>(`${this.URL}/avance/file/${fileName}`, { responseType: 'blob' as 'json'});
  }

  avanceTrimesral(solicitud:number, trimestre:number): Observable<Avance[]>{
    return this.http.get<Avance[]>(`${this.URL}/avancetrimestral/${solicitud}/${trimestre}`);
  }

}


