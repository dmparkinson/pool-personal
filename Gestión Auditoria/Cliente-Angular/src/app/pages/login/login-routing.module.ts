import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthLoginService  as AuthGuard} from 'src/app/shared/conf/auth/authLoginService';


const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '**', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
