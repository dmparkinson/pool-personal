
import { TransaccionService } from 'src/app/pages/services/transaccion.service';
import { Transaccion } from 'src/app/pages/interfaces/transaccion';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


/*
  Index de transaccion
  -Listar transacciones
  -Eliminar transaccion
  -Abrir modal de actualizar transaccion
*/

@Component({
  selector: 'transaccion-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  title= 'Transacción'
  transaccion : Transaccion = {
    descripcion : '',
  }
  id: number;
  data: any=[];                                         //Datos recuperados de la api
  transacciones: any=[];                                //Contenido de la tabla
  dtElement: DataTableDirective;                        //Directiva del datatable
  dtOptions: any = [];                                  //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  constructor(private modalService: NgbModal, private service:TransaccionService) { }


  ngOnInit(): void {
    this.dtOptions = {                                  //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                       //Tipo de paginacion
      pageLength: 10,                                   //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
    }    
    this.listarTransaccion();                             //Añadir los datos a la tabla al iniciar el aplicativo
  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }
  
  listarTransaccion(){                                    //Listar todos los transaccion
    this.service.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.transacciones = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 
  
  obtenerTransaccion(id){                             //Obtener un transaccion
    return this.service.get(id).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.transaccion.descripcion =  this.data.msg.descripcion;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 



  abrirmodalActualizar(modal:any, id){              //Abrir el modal de actualizar e insertar los datos de transaccion a editar
    this.id = id;
    this.obtenerTransaccion(id);
    this.modalService.open(modal);    
  }

  resetTransaccion(){                                //Resetear el objeto transaccion
    this.transaccion.descripcion = '';
    this.id = 0;
  }

  rebuild():void{                                  //Recargar tabla
    var tab = $('#table').DataTable();
    tab.destroy();
    this.listarTransaccion();
    // this.tableTrigger.next();
      
  } 

  reloadTable(flagReload){                        //Solicitud de otros componentes para recargar la tabla
    if(flagReload === true){
      this.rebuild();
    }
  }

  alerts(type, title,msg){                        //Alertas
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

