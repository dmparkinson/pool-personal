import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { User } from "./user.model";

/*
  Configuracion de las variables de sesion
  -Crear
  -Cargar
  -Obtener
  -Validar autenticacion
  -Cerrar
*/

@Injectable()
export class StorageService {

  constructor(private router: Router) {}

  setCurrentSession(session: User): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  loadSessionData(): User{
    var sessionStr = localStorage.getItem('session');
    return (sessionStr) ? <User> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): User {
    return this.loadSessionData();
  }
  
  isAuthenticated(): boolean {
    return (this.getCurrentSession() != null) ? true : false;
  };

  logout(): void{
    localStorage.removeItem('session');
    this.router.navigate(['/login']);
  }

}