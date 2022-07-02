import { FuncionarioService } from 'src/app/pages/services/funcionario.service';
import { SolicitudService } from 'src/app/pages/services/solicitud.service';
import { Solicitud } from 'src/app/pages/interfaces/solicitud';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import 'datatables.net-buttons';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { Router } from '@angular/router';

/*
  Index de solicitud
  -Listar solicitud
  -Eliminar solicitud
  -Abrir modal de actualizar solicitud
*/


@Component({
  selector: 'solicitud-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  title = 'Solicitud';
  id: number;
  solicitud: Solicitud = {
    alias: '',
    responsable: 0,
    usuarioAplicativo: 0,
    documento: '',
    fecha: '',
    fechaInicio: '',
    fechaFin: '',
    finalizado: 0,
    responsableUsuarioFinal: 0
  };

  funcionarios: any = [];
  file: File;
  data: any = [];                                         //Datos recuperados de la api
  solicitudes: any = [];                                //Contenido de la tabla
  dtElement: DataTableDirective;                        //Directiva del datatable
  dtOptions: any = [];                                  //Configuracion del datatable
  tableTrigger: Subject<any> = new Subject();

  fechaDeInico: string = '';
  fechaDefin: string = '';
  solicitudesFiltradas: any = [];

  constructor(private modalService: NgbModal, private serviceFun: FuncionarioService, private serviceSol: SolicitudService, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {                                  //Configuracion del contenido del datatable
      //pagingType: 'full_numbers',                     //Tipo de paginacion
      pageLength: 10,                                   //Cantidad de filas mostradas
      "language": { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
      responsive: true,
      dom: 'Bfrtip',
      buttons:{
        buttons: [
          {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: 'LEGAL',
            filename: 'pdfSolicitud '+this.getFormatDateTime(new Date()),
            className: 'btn btn-danger',
            },{
            extend: 'excelHtml5',
            className: 'btn-success'
          }, {
            extend: 'print',
            className: 'btn-dark'
          }
        ],
      dom: { // Formatear estilo por defecto de botones datatable
        button: {
             className: 'btn btn-sm'
        },
        buttonLiner: {
             tag: null
        }
       }      
    }
  }
    this.listarSolicitud();                               //Añadir los datos a la tabla al iniciar el aplicativo
  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }

  listarSolicitud() {                                      //Listar todos los solicitud

    this.serviceSol.list().subscribe(result => {
      this.data = result;
      if (this.data.success === true) {

        var tab = $('#table').DataTable();
        tab.destroy();

        this.solicitudes = this.data.msg;
        this.tableTrigger.next();
      }
      else {
        this.alerts(2, 'Error', this.data.msg);
      }
    });
  }

  obtenerSolicitud(id) {                                   //Obtener un solicitud
    return this.serviceSol.get(id).subscribe(result => {
      this.data = result;
      if (this.data.success === true) {
        this.solicitud.alias = this.data.msg.alias;
        this.solicitud.responsable = this.data.msg.id_responsable;
        this.solicitud.usuarioAplicativo = this.data.msg.id_usuario_aplicativo;
        this.solicitud.documento = this.data.msg.documento;
        this.solicitud.fecha = this.getFormatDateTime(new Date());//this.data.msg.fecha_hora))
        this.solicitud.fechaInicio = this.getFormatDate(this.data.msg.fecha_inicio);
        this.solicitud.fechaFin = this.getFormatDate(this.data.msg.fecha_fin);
        this.solicitud.responsableUsuarioFinal = this.data.msg.id_responsable_usuario_final;
        this.solicitud.finalizado = this.data.msg.finalizado;
      }
      else {
        this.alerts(2, 'Error', this.data.msg);
      }
    });
  }

  listarFuncionarios() {                                   //Obtener lista funcionarios
    return this.serviceFun.list().subscribe(result => {
      this.data = result;
      if (this.data.success === true) {
        this.funcionarios = this.data.msg;
      }
      else {
        this.alerts(2, 'Error', this.data.msg);
      }
    });
  }

  eliminarSolicitud(id: number, usuarioAplicativo: number) {                           //Levantar la ventana de confirmacion de eliminado   
    Swal.fire({
      title: '¿Estás seguro de querer eliminar la solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value === true) {
        this.serviceSol.delete(id, this.solicitud.fecha, this.solicitud.usuarioAplicativo).subscribe(result => {
          this.data = result;
          if (this.data.success === true) {
            this.alerts(1, this.data.msg, '');
            this.rebuild();
          }
          else {
            this.alerts(2, 'Error', this.data.msg);
          }
        });
      }
    });
    this.resetSolicitud();
  }



  abrirmodalActualizar(modal: any, id) {                  //Abrir el modal de actualizar e insertar los datos de la solicitud a editar
    try {
      this.id = id;
      this.obtenerSolicitud(id);
      this.listarFuncionarios();
      this.modalService.open(modal);
    } catch (e) {
      this.alerts(3, 'Error inesperado', 'Porfavor intentelo más tarde.');
    }
  }

  resetSolicitud() {                                   //Resetear el objeto avance
    this.solicitud.fecha = '';
    this.solicitud.alias = '';
    this.solicitud.responsable = 0;
    this.solicitud.usuarioAplicativo = 0;
    this.solicitud.documento = '';
    this.solicitud.fecha = '';
    this.solicitud.fechaInicio = '';
    this.solicitud.fechaFin = '';
    this.solicitud.responsableUsuarioFinal = 0;
    this.solicitud.finalizado = 0;
    this.data = null;
    this.funcionarios = null;
    this.file = null;
    this.solicitudes = null;                                //Contenido de la tabla

  }

  rebuild(): void {                                     //Recargar tabla
    var tab = $('#table').DataTable();
    tab.destroy();
    this.listarSolicitud();
    // this.tableTrigger.next();

  }

  reloadTable(flagReload) {                            //Solicitud de otros componentes para recargar la tabla
    if (flagReload === true) {
      this.rebuild();
    }
  }

  abrirFile(documento) {                                     //Obtener y abrir archivo
    this.serviceSol.getFile(documento).subscribe(result => {
      const fileURL = URL.createObjectURL(result);
      window.open(fileURL);
    });
  }

  getFormatDateTime(date) {                                     //Obtener el datetime
    var curr_date = date.getDate();
    var curr_month = date.getMonth() +1;
    var curr_year = date.getFullYear();
    var curr_hour = date.getHours();
    var curr_min = date.getMinutes();
    if ((date.getMonth() + 1) < 10) {              // Mes
      curr_month = '0' + (date.getMonth() + 1);
    } if (date.getDate() < 10) {                  // Dia
      curr_date = '0' + (date.getDate());
    } if (date.getHours() < 10) {                 //Horas
      curr_hour = '0' + (date.getHours());
    } if (date.getMinutes() < 10) {                 // Minutos
      curr_min = '0' + (date.getMinutes());
    }
    return curr_year + '-' + curr_month + '-' + curr_date + 'T' + curr_hour + ':' + curr_min;
  }


  getFormatDate(dateChange) {
    let date = new Date(dateChange);
    var curr_date = '';
    var curr_month = '';
    var curr_year = date.getFullYear();

    if ((date.getMonth() + 1) < 10) {
      curr_month = '0' + (date.getMonth() + 1);
    } else {
      curr_month = (date.getMonth() + 1).toString();
    }
    if (date.getDate() < 10) {
      curr_date = '0' + (date.getDate());
    } else {
      curr_date = (date.getDate()).toString();
    }
    return curr_year + '-' + curr_month + '-' + curr_date;
  }

  alerts(type, title, msg) {                             //Alertas
    if (type == 1) {
      Swal.fire({
        position: 'top-left',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 2500
      })
    } else if (type == 2) {
      Swal.fire({
        icon: 'error',
        title: title,
        text: msg,
      })
    }
    else if (type == 3) {
      Swal.fire({
        icon: 'warning',
        text: msg,
      })
    }
  }

  filtrarSolicitudes() {

    this.serviceSol.filtrarSolicitudes(this.fechaDeInico, this.fechaDefin).subscribe(result => {
      this.data = result;
      if (this.data.success === true) {
        var tab = $('#table').DataTable();
        tab.destroy();
        this.solicitudes = this.data.msg;
        this.tableTrigger.next();
      }
      else {
        this.alerts(2, 'Error', this.data.msg);
      }
    });
  }

  avanceTrimestral(solicitud) {
    this.router.navigate(['/reporte/avance-trimestral',solicitud]);
  }

}
