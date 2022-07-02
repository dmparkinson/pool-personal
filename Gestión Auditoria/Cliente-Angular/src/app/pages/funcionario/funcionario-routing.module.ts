import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthGuardService  as AuthGuard} from 'src/app/shared/conf/auth/authService';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';


const routes: Routes = [
  {path: 'funcionario', component: IndexComponent, canActivate:[AuthGuard]},
  {path: 'funcionario/agregar', component: AgregarComponent, canActivate:[AuthGuard]},
  {path: 'funcionario/actualizar', component: ActualizarComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
