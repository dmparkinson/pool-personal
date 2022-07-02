import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PerfilRoutingModule } from './perfil-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxBootstrapIconsModule, allIcons} from 'ngx-bootstrap-icons';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    SharedModule,
    FormsModule,
    PerfilRoutingModule,
    CommonModule
  ]
})
export class PerfilModule { }
