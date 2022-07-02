import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/shared/conf/Session/storageService';
import { LoginService } from '../../../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/conf/Session/user.model';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

/*
  Login de usuario
  -Valida ingreso correcto de datos
  -Impide que el usuario ingreso a otros sectores sin haber iniciado sesion
  -Redirecciona a la pagina principal, POR EL MOMENTO: Avance

*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

                                                        //Variables globales
  formLogin: FormGroup;
  title= 'Inicio de sesión';
  data: any;                                            //Datos recuperados de la BD                                   
 
  constructor(private service:LoginService, private route: ActivatedRoute, private router: Router,  
    private fb: FormBuilder, private storage: StorageService) {
    this.formValid();
   }

  ngOnInit(): void { }
  
  formValid() {                                         // Validacion del formulario
    this.formLogin = this.fb.group({
      logname: new FormControl('',[Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(30)]),
      passw:new FormControl('',[Validators.required,
                                Validators.maxLength(30),
                                Validators.minLength(4),
                                Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ]{1,15}$')])
    });
  }

  login(){                                              //Login del usuario
    if (this.formLogin.valid) {
      this.service.get(this.formLogin.value.logname,this.formLogin.value.passw).subscribe((result)=>{
        this.data = result;
        if(this.data.success == true){
          let user: User={nombre: this.data.msg.nombre, id:this.data.msg.id_funcionario};// Crear objeto usuario
          this.storage.setCurrentSession(user);         //Enviar objeto a la variable de sesion
          this.router.navigate(['/avance']);            //Redireccionar a la pagina principal
        } else {
          this.alertFail(3,'' ,this.data.msg);
        }
      },err =>{
        this.alertFail(2,'Error inesperado' ,'Intente denuevo.');
      });
    }
    else{
      this.alertFail(3,'' ,'No se realizó la solicitud. Formato erróneo o campos vacíos.');
    }
  } 

  alertFail(type, title,msg){                            //Alertas
    if(type == 1 ){
      Swal.fire({
        position: 'top-left',
        icon: 'success',
        title: 'Registro éxitosa.',
        showConfirmButton: false,
        timer: 2500
        })
    }else if(type == 2){
      Swal.fire({
        icon: 'error',
        title: title,
        text: msg,
      })
    }
    else if(type == 3){
      Swal.fire({
        icon: 'warning',
        text: msg,
      })
    }
  }
  
}





