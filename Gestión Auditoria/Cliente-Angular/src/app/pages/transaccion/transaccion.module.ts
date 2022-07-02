import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { TransaccionRoutingModule } from './transaccion-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IndexComponent, ActualizarComponent, AgregarComponent],
  imports: [
    CommonModule,
    TransaccionRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class TransaccionModule { }
