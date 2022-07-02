import { AvanceRoutingModule } from './avance-routing.module';
import { NgxBootstrapIconsModule, allIcons} from 'ngx-bootstrap-icons';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IndexComponent } from './components/index/index.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ActualizarComponent } from './components/actualizar/actualizar.component';



@NgModule({
  declarations: [IndexComponent, AgregarComponent, ActualizarComponent],
  imports: [
    CommonModule,
    AvanceRoutingModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class AvanceModule { }
