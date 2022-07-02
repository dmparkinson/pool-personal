import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransaccionBitacoraComponent } from './transaccion-bitacora/transaccion-bitacora.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvanceTrimestralComponent } from './avance-trimestral/avance-trimestral.component';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';

import { GraficoSolicitudComponent } from './grafico-solicitud/grafico-solicitud.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoAvanceComponent } from './grafico-avance/grafico-avance.component';
import { CambiosSolicitudComponent } from './cambios-solicitud/cambios-solicitud.component';
import { NgxBootstrapIconsModule, allIcons} from 'ngx-bootstrap-icons';


@NgModule({
  declarations: [TransaccionBitacoraComponent, GraficoSolicitudComponent, AvanceTrimestralComponent, GraficoAvanceComponent, CambiosSolicitudComponent],
  imports: [
    CommonModule, SharedModule, ChartsModule, SharedModule,
    DataTablesModule,FormsModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class ReportsModule { }
