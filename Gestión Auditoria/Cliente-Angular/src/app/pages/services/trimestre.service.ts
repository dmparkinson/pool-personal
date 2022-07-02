import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Trimestre } from '../interfaces/trimestre'; 

@Injectable({
  providedIn: 'root'
})
export class TrimestreService {
  private URL = environment.host;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar trimestre
  list(): Observable<Trimestre[]>{
    return this.http.get<Trimestre[]>(`${this.URL}/trimestre`);
  }

  // Obtener un trimestre utililizando su ID
  get(id:number): Observable<Trimestre> {
    return this.http.get<Trimestre>(`${this.URL}/trimestre/${id}/`);
  }
  
  // Crear un nuevo trimestre utilizando la interface trimestre
  add(trimestre:Trimestre): Observable<Trimestre> {
    return this.http.post<Trimestre>(`${this.URL}/trimestre/crear/`, trimestre);
  }
  // Editar un trimestre, aqui se elimina tambien
  edit(id:number,trimestre:Trimestre): Observable<Trimestre> {
    return this.http.put<Trimestre>(`${this.URL}/trimestre/actualizar/${id}`, trimestre);
  }
}


