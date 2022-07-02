import { StorageService } from "../Session/storageService";
import { Router, CanActivate } from '@angular/router';
import { Injectable } from "@angular/core";

/*
  Guard
  Impide el ingreso o regrese al login si el usuario se encuentra logueado
*/

@Injectable()
export class AuthLoginService implements CanActivate{
  
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(): boolean {              //Si el usuario se encuentra logueado entonces impedir ir al login
    if (!this.storage.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/avance']);
    return false;
  }
 
}