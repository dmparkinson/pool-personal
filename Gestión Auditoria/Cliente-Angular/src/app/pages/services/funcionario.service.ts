import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';
import { Funcionario } from '../interfaces/funcionario'; 
import { Funcionario2 } from '../interfaces/Funcionario2'; 

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private URL = environment.host;

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }

  //Listar departamentos
  list(): Observable<Funcionario[]>{
    
    return this.http.get<Funcionario[]>(`${this.URL}/Funcionario`);
  }

  funcionarioId(id): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${this.URL}/Funcionario/${id}/`);
  }
  
    
  // Editar un funcionario, aqui se elimina tambien
  edit(id:number,funcionario:Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.URL}/funcionario/actualizar/${id}`, funcionario);
  }

  add(funcionario:Funcionario2): Observable<Funcionario2> {
    console.log('me cago en esta verga')
    return this.http.post<Funcionario2>(`${this.URL}/funcionario/crear/`, funcionario);
  }

  

}
