import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/perfil/index/index.component';
import { AuthGuardService  as AuthGuard} from 'src/app/shared/conf/auth/authService';
import { GraficoSolicitudComponent } from './pages/reports/grafico-solicitud/grafico-solicitud.component'; 
import { TransaccionBitacoraComponent } from './pages/reports/transaccion-bitacora/transaccion-bitacora.component'; 
import { AvanceTrimestralComponent } from './pages/reports/avance-trimestral/avance-trimestral.component';
import { GraficoAvanceComponent } from './pages/reports/grafico-avance/grafico-avance.component';
import { CambiosSolicitudComponent } from './pages/reports/cambios-solicitud/cambios-solicitud.component';

const routes: Routes = [
  {path: 'perfil', component: IndexComponent, canActivate:[AuthGuard]},
  {path: 'reporte/avance-trimestral', component: AvanceTrimestralComponent, canActivate:[AuthGuard]},
  {path: 'reporte/grafico-solicitud', component: GraficoSolicitudComponent, canActivate:[AuthGuard]},
  {path: 'reporte/grafico-avance', component: GraficoAvanceComponent, canActivate:[AuthGuard]},
  {path: 'reporte/transaccion-bitacora', component: TransaccionBitacoraComponent, canActivate:[AuthGuard]},
  {path: 'reporte/cambios-solicitud', component: CambiosSolicitudComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
