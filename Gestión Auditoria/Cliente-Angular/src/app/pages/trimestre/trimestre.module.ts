import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { TrimestreRoutingModule } from './trimestre-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IndexComponent, AgregarComponent, ActualizarComponent],
  imports: [
    CommonModule,
    TrimestreRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgxBootstrapIconsModule.pick(allIcons)
    ]
})
export class TrimestreModule { }
