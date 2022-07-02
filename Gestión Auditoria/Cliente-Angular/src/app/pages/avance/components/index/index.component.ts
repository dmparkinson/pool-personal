import { FuncionarioService } from 'src/app/pages/services/funcionario.service';
import { SolicitudService } from 'src/app/pages/services/solicitud.service';
import { TrimestreService } from 'src/app/pages/services/trimestre.service';
import { AvanceService } from '../../../services/avance.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Avance } from '../../../interfaces/avance';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

/*
  Index de Avances
  -Listar avance
  -Eliminar avance
  -Abrir modal de actualizar avance
*/

@Component({
  selector: 'avance-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  title = 'Avance';
  id: number;
  avance: Avance = {
    trimestre: 0,
    usuarioAplicativo: 0,
    solicitud: 0,
    documento: null,
    fecha: ''
    };
  
  solicitudes: any=[];                                          //Listado de solicitudes
  funcionarios: any=[];                                         //Listado de funcionarios
  trimestres: any=[];                                           //Listado de trimestres

  data: any=[];                                                 //Datos recuperados de la api
  avances: any = [];                                            //Contenido de la tabla
  dtElement: DataTableDirective;                                //Directiva del datatable
  dtOptions: any = [];                                          //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  constructor(private modalService: NgbModal, private service:AvanceService,
    private serviceFun: FuncionarioService, private serviceSol: SolicitudService, private serviceTrim: TrimestreService) { }

  ngOnInit(): void {
    this.dtOptions = {                                           //Configuracion del contenido del datatable
      //pagingType: 'full_numbers',                              //Tipo de paginacion
      pageLength: 10,                                            //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
    }    
    this.listarAvances();                                         //Añadir los datos a la tabla al iniciar el aplicativo
  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }
  
  listarAvances(){                                                 //Listar todos los avances
    this.service.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.avances = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 
  
  obtenerAvance(id){                                               //Obtener un avance
    return this.service.get(id).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
       this.avance.fecha = this.getFormatDate(new Date(this.data.msg.fecha_hora));
        this.avance.trimestre =  this.data.msg.id_trimestre;
        this.avance.usuarioAplicativo =  this.data.msg.id_usuario_aplicativo;
        this.avance.solicitud =  this.data.msg.id_solicitud;
        this.avance.documento =  this.data.msg.documento;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  listarFuncionarios(){                                           //Obtener lista funcionarios
    return this.serviceFun.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.funcionarios =  this.data.msg;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  listarTrimestres(){                                            //Listar todos los trimestre
    this.serviceTrim.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.trimestres = this.data.msg;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  listarSolicitudes(){                                          //Listar todos las solicitudes
    this.serviceSol.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.solicitudes = this.data.msg;
      }
      else{
        this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  eliminarAvance(id:number){                                    //Levantar la ventana de confirmacion de eliminado
    this.id = id;
    Swal.fire({
      title: '¿Estás seguro de querer eliminar el avance?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) =>{
      if(result.value === true){
        this.service.delete(Number(this.id)).subscribe(result => {
          this.data = result;
          if(this.data.success === true){
            this.alerts(1,this.data.msg, '');
            this.rebuild();
          }
          else{
            this.alerts(2,'Error',this.data.msg);
          }
        });
        this.resetAvance();
      }
    });
  }
  

  abrirmodalActualizar(modal:any, id){                      //Abrir el modal de actualizar e insertar los datos del avance a editar
    try{
      this.id = id;
      this.obtenerAvance(id);
      this.listarFuncionarios();
      this.listarTrimestres();
      this.listarSolicitudes();
      this.modalService.open(modal);  
    }catch(e){
      this.alerts(3, 'Error inesperado','Porfavor intentelo más tarde.');   
    }
  }

  abrirFile( documento ){                                     //Obtener y abrir archivo
    console.log(documento)
    this.service.getFile(documento).subscribe(result => {
      const fileURL = URL.createObjectURL(result);
      window.open(fileURL);
    });
  }

  resetAvance(){                                            //Resetear el objeto avance
    this.avance.trimestre =  0;
    this.avance.fecha = '';
    this.avance.usuarioAplicativo =  0;
    this.avance.solicitud =  0;
    this.avance.documento =  null;
  }

  rebuild():void{                                           //Recargar tabla
    var tab = $('#table').DataTable();
    tab.destroy();
    this.listarAvances();
    // this.tableTrigger.next();
      
  } 

  reloadTable(flagReload){                                  //Solicitud de otros componentes para recargar la tabla
    if(flagReload === true){
      this.rebuild();
    }
  }


  getFormatDate(date){
    var curr_date = date.getDate();
    var curr_month = date.getMonth();
    var curr_year = date.getFullYear();
    var curr_hour = date.getHours ();
    var curr_min = date.getMinutes ();
    if( (date.getMonth()+1) < 10){              // Mes
      curr_month =  '0'+(date.getMonth()+1);
    } if( date.getDate() < 10){                  // Dia
      curr_date =  '0'+(date.getDate());
    } if( date.getHours() < 10){                 //Horas
      curr_hour =  '0'+(date.getHours());
    }if( date.getMinutes() < 10){                 // Minutos
      curr_min =  '0'+(date.getMinutes());
    }
    return curr_year+'-'+curr_month+'-'+curr_date+'T'+curr_hour+':'+curr_min;
  }

  alerts(type, title,msg){                                  //Alertas
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
