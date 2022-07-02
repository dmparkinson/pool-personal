import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/shared/conf/Server/server-config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = environment.host; //                      Variable de sesion

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    })
  }

  constructor(private http:HttpClient) { }
 
  get(user:string, password:string): Observable<Object> {// Buscar usuario en la BD
    return this.http.get(`${this.URL}/login/${user}/${password}`);
  }

    

}
