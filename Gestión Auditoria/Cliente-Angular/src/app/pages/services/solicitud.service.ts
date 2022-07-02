import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Solicitud } from '../interfaces/solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private URL = environment.host;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar solicitudes
  list(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${this.URL}/solicitud`);
  }

  //Listar solicitudes no finalizadas
  listPendiente(): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${this.URL}/solicitud/pendiente`);
  }

  //Obtener cantidad de solicitudes finalizadas y no finalizadas
  getState(): Observable<Solicitud[]>{   
    return this.http.get<Solicitud[]>(`${this.URL}/solicitud/estado`);
  }

  //Obtener cantidad de avances de cada solicitud
  getAvances(): Observable<Solicitud[]>{ 
    return this.http.get<Solicitud[]>(`${this.URL}/solicitud/avances/`);
  }

  // Obtener una solicitud utililizando su ID
  get(id:number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.URL}/solicitud/${id}/`);
  }
  
  // Crear una nueva solicitud utilizando la interface solicitud
  add(solicitud:FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.URL}/solicitud/crear/`, solicitud);
  }
  // Editar una solicitud, aqui se elimina tambien
  edit(id:number,solicitud:FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.URL}/solicitud/actualizar/${id}`, solicitud);
  }

  //Eliminar una solicitud
  delete(id:number, fecha:string, usuario:number): Observable<object> {
    return this.http.delete<object>(`${this.URL}/solicitud/${id}/${usuario}/${fecha}`);
  }

  //Obtener una file
  getFile(fileName:String): Observable<Object> {
    return this.http.get<Object>(`${this.URL}/solicitud/file/${fileName}`, { responseType: 'blob' as 'json'});
  }

  filtrarSolicitudes(fechaDeInicio:string, fechaDeFin:string): Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${this.URL}/solicitud/filtro/${fechaDeInicio}/${fechaDeFin}`);
  }
}