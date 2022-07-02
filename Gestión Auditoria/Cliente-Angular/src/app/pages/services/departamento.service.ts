import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private URL = environment.host;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar departamentos
  list(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>(`${this.URL}/departamento`);
  }

  // Obtener un departamento utililizando su ID
  get(id:number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.URL}/departamento/${id}/`);
  }
  
  // Crear un nuevo departamento utilizando la interface Departamento
  add(departamento:Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.URL}/departamento/crear/`, departamento);
  }
  // Editar un departamento, aqui se elimina tambien
  edit(id:number,departamento:Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.URL}/departamento/actualizar/${id}`, departamento);
  }
}

