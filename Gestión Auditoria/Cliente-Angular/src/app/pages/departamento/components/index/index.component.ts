import { DepartamentoService } from '../../../services/departamento.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Departamento } from '../../../interfaces/departamento';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

/*
  Index de Departamentos
  -Listar departamentos
  -Eliminar departamentos
  -Abrir modal de actualizar departamentos
*/

@Component({
  selector: 'departamento-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit, OnDestroy {

  title = 'Departamentos';
  departamento : Departamento = {
    nombre : '',
    eliminado: 0,
  }
  id: number;
  data: any=[];                                     //Datos recuperados de la api
  departamentos: any=[];                            //Contenido de la tabla
  dtElement: DataTableDirective;                    //Directiva del datatable
  dtOptions: any = [];                              //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  constructor(private modalService: NgbModal, private service:DepartamentoService) { }

  ngOnInit(): void {
    this.dtOptions = {                              //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                   //Tipo de paginacion
      pageLength: 10,                               //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
    }    
    this.listarDepartamentos();                     //Añadir los datos a la tabla al iniciar el aplicativo
  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }
  
  listarDepartamentos(){                            //Listar todos los departamentos
    this.service.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.departamentos = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 
  
  obtenerDepartamento(id){                        //Obtener un departamento
    return this.service.get(id).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.departamento.nombre =  this.data.msg.nombre;
        this.departamento.eliminado = 0;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  eliminarDepartamento(id:number){                //Levantar la ventana de confirmacion de eliminado
    this.obtenerDepartamento(id);
    this.departamento.eliminado = 1;
    this.id = id;
    Swal.fire({
      title: '¿Estás seguro de querer eliminar el departamento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) =>{
      if(result.value === true){
        this.departamento.eliminado = 1;
        this.eliminar();                          //Iniciar el metodo de eliminar
      }
      else{
        this.resetDepartamento();
      }
    });
  }
  
  eliminar(){                                     //Eliminar un departamento
    if(!this.departamento.nombre){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else{
      this.service.edit(Number(this.id),this.departamento).subscribe(result => {
        this.data = result;
        if(this.data.success === true){
        
        this.alerts(1,this.data.msg, '');
        this.rebuild();
        }
        else{
          this.alerts(2,'Error',this.data.msg);
        }
      });
      this.resetDepartamento();
    }
  } 
  
  abrirmodalActualizar(modal:any, id){          //Abrir el modal de actualizar e insertar los datos del departamento a editar
    this.id = id;
    this.obtenerDepartamento(id);
    this.modalService.open(modal);    
  }

  resetDepartamento(){                          //Resetear el objeto departamento
    this.departamento.nombre = '';
    this.departamento.eliminado = 0;
    this.id = 0;
  }

  rebuild():void{                               //Recargar tabla
    var tab = $('#table').DataTable();
    tab.destroy();
    this.listarDepartamentos();
    // this.tableTrigger.next();
      
  } 

  reloadTable(flagReload){                      //Solicitud de otros componentes para recargar la tabla
    if(flagReload === true){
      this.rebuild();
    }
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
