import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxBootstrapIconsModule, allIcons} from 'ngx-bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { DataTablesModule } from "angular-datatables";




@NgModule({
  declarations: [IndexComponent, AgregarComponent, ActualizarComponent],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class SolicitudModule { }
