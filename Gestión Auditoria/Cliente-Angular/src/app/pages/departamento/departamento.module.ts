import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { AgregarComponent } from './components/agregar/agregar.component';
import { NgxBootstrapIconsModule, allIcons} from 'ngx-bootstrap-icons';
import { IndexComponent } from './components/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';




@NgModule({
  declarations: [IndexComponent, AgregarComponent, ActualizarComponent],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class DepartamentoModule { }
