import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/app/pages/services/funcionario.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/pages/interfaces/funcionario'; 

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  result : any= []; 

  id: number;
  data: any=[];                                     //Datos recuperados de la api
  funcionarios2: any=[];                            //Contenido de la tabla
  dtElement: DataTableDirective;                    //Directiva del datatable
  dtOptions: any = [];                              //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  funcionario: Funcionario = {nombre:'',  
                              logname:'', 
                              departamento:0, 
                              foto:'', 
                              fechaNacimiento:'', 
                              contrasenia:'',
                              eliminado:0};



  constructor(public rest:FuncionarioService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {                              //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                   //Tipo de paginacion
      pageLength: 10,                               //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
    }    
    this.listarFuncionarios();                  //Añadir los datos a la tabla al iniciar el aplicativo
  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
    
  }



  listarFuncionarios(){                            //Listar todos los departamentos
    this.rest.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.funcionarios2 = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        alert(this.result.success);
      }
    });
  } 

  eliminar(funcionario){
  this.funcionario.nombre = funcionario.nombre;
  this.funcionario.logname = funcionario.logname;
  this.funcionario.departamento = funcionario.id_departamento;
  this.funcionario.foto = funcionario.foto;
  this.funcionario.fechaNacimiento = funcionario.fecha_nacimiento;
  this.funcionario.contrasenia = funcionario.contraseña;
  this.funcionario.eliminado = 0;

  this.rest.edit(funcionario.id_funcionario, this.funcionario).subscribe(data => {
    this.result = data;
    if(this.result.success === true){
      alert(this.result.msg);
      this.listarFuncionarios();
    }
    else{
      this.alerts(2,'Error',this.result.success);
    }  
    });
  }

  eliminarFuncionario(funcionario){                //Levantar la ventana de confirmacion de eliminado

    Swal.fire({
      title: '¿Estás seguro de querer eliminar el departamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) =>{
      if(result.value === true){
        this.eliminar(funcionario);                          //Iniciar el metodo de eliminar
      }

    });
  }

  agregar() {
    this.router.navigate(['/funcionario/agregar']);
  }

  actualizar(funcionario) {
    this.router.navigate(['/funcionario/actualizar',funcionario]);
  }


  
  alerts(type, title,msg){                    //Alertas
    if(type == 1 ){
      Swal.fire({
        position: 'top-left',
        icon: 'success',
        title: title,
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
