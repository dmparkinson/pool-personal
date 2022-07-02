import { TrimestreService } from 'src/app/pages/services/trimestre.service'; 
import { Trimestre } from 'src/app/pages/interfaces/trimestre'; 
import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


/*
  Index de Trimestres
  -Listar trimestres
  -Eliminar trimestres
  -Abrir modal de actualizar trimestres
*/

@Component({
  selector: 'trimestre-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  title = 'Trimestre';
  trimestre : Trimestre = {
    descripcion : '',
  }
  id: number;
  data: any=[];                                     //Datos recuperados de la api
  trimestres: any=[];                               //Contenido de la tabla
  dtElement: DataTableDirective;                    //Directiva del datatable
  dtOptions: any = [];                              //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  constructor(private modalService: NgbModal, private service:TrimestreService) { }


  ngOnInit(): void {
    this.dtOptions = {                              //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                   //Tipo de paginacion
      pageLength: 10,                               //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
    }    
    this.listarTrimestre();                         //Añadir los datos a la tabla al iniciar el aplicativo
  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }
  
  listarTrimestre(){                                //Listar todos los trimestre
    this.service.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.trimestres = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 
  
  obtenerTrimestre(id){                             //Obtener un trimestre
    return this.service.get(id).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.trimestre.descripcion =  this.data.msg.descripcion;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 



  abrirmodalActualizar(modal:any, id){              //Abrir el modal de actualizar e insertar los datos del trimestre a editar
    this.id = id;
    this.obtenerTrimestre(id);
    this.modalService.open(modal);    
  }

  resetTrimestre(){                                //Resetear el objeto trimestre
    this.trimestre.descripcion = '';
    this.id = 0;
  }

  rebuild():void{                                  //Recargar tabla
    var tab = $('#table').DataTable();
    tab.destroy();
    this.listarTrimestre();
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

