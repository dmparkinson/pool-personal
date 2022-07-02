import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthGuardService  as AuthGuard} from 'src/app/shared/conf/auth/authService';


const routes: Routes = [
  {path: 'departamento', component: IndexComponent,  canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
