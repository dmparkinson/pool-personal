import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvanceModule } from './pages/avance/avance.module';
import { DepartamentoModule } from './pages/departamento/departamento.module';
import { FuncionarioModule } from './pages/funcionario/funcionario.module';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';
import { SolicitudModule } from './pages/solicitud/solicitud.module';
import { StorageService } from './shared/conf/Session/storageService';
import { AuthGuardService } from './shared/conf/auth/authService';
import { AuthLoginService } from './shared/conf/auth/authLoginService';
import { TransaccionModule } from './pages/transaccion/transaccion.module';
import { TrimestreModule } from './pages/trimestre/trimestre.module'; 
import { PerfilModule } from './pages/perfil/perfil.module';
import { ReportsModule } from './pages/reports/reports.module';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    AvanceModule,
    DepartamentoModule,
    FuncionarioModule,
    SolicitudModule,
    TransaccionModule,
    TrimestreModule,
    LoginModule,
    SharedModule,
    PerfilModule,
    ReportsModule
  ],
  providers: [StorageService, AuthGuardService, AuthLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
