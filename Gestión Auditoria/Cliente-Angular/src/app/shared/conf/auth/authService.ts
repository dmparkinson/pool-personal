
import { StorageService } from "../Session/storageService";
import { Router, CanActivate } from '@angular/router';
import { Injectable } from "@angular/core";
/*
  Guard
  Impide el ingreso a otras rutas sin haberse logueado
*/

@Injectable()
export class AuthGuardService implements CanActivate{
  
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(): boolean {                // Si el usuario no se encuentra logueado entonces obligar a regresar al login
    if (!this.storage.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
 
}