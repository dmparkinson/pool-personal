import { FuncionarioService } from 'src/app/pages/services/funcionario.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SolicitudService } from 'src/app/pages/services/solicitud.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Solicitud } from 'src/app/pages/interfaces/solicitud';
import Swal from 'sweetalert2';

/*
  Agregar un nueva solicitud
  - Envia una señal al index para actualizar tabla en caso de completar 
    correctamente el registro de la solicitud
*/


@Component({
  selector: 'solicitud-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  @Output() flagReload: EventEmitter<boolean> = new EventEmitter(); //Pedido para actualizar tabla al index
  solicitud: Solicitud = {
    alias: '',
    responsable: 0,
    usuarioAplicativo: 0,
    documento: null,
    fecha: '',
    fechaInicio: '',
    fechaFin: '',
    finalizado: 0,
    responsableUsuarioFinal: 0
  };
  file: File;
  funcionarios: any;                                                //Listado funcionarios 
  data: any = [];                                                     //Datos recuperados de BD
  title = 'Registrar solicitud';
  modalOptions: NgbModalOptions;                                     //Modal


  constructor(private modalService: NgbModal, private serviceFun: FuncionarioService, private serviceSol: SolicitudService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit(): void {
    this.file = null;
  }

  agregarSolicitud() {                                                    //Crear una nueva solicitud
    if (!this.solicitud.alias || !this.solicitud.responsable || !this.solicitud.usuarioAplicativo
      || !this.solicitud.responsableUsuarioFinal || !this.solicitud.fechaInicio || !this.solicitud.fechaFin) {
      this.alerts(3, 'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else {
      if (this.solicitud.fechaInicio < this.solicitud.fechaFin) {
        this.solicitud.fecha = this.getFormatDateTime(new Date());
        let formData = new FormData();                                        // Crear Form-data
        formData.append('file', this.file);
        formData.append('data', JSON.stringify(this.solicitud));
        this.serviceSol.add(formData).subscribe(result => {       // Registrar un nuevo avance
          this.data = result;
          if (this.data.success === true) {                               // Si se registro correctamente
            this.alerts(1, this.data.msg, '');
            this.flagReload.emit(true);                                 //Enviar señal para actualizar tabla
            this.resetSolicitud();
          }
          else {
            this.alerts(2, 'Error', this.data.msg);
            this.flagReload.emit(false);
          }
        });
      } else {
        this.alerts(3, 'Error en las fehcas', 'La fecha de inicio debe ser anterior a la fecha final.');
      }
    }
  }

  listarFuncionarios() {                                             //Obtener lista funcionarios
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

  getFormatDateTime(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth()+1;
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

  abrirmodalAgregar(modal: any) {                                    //Abrir modal de agregar
    this.resetSolicitud();                                          //Resetear campos antes de abrir modal
    try {
      this.listarFuncionarios();
      this.modalService.open(modal);                                //Abrir modal
    } catch (e) {
      this.alerts(3, 'Error inesperado', 'Porfavor intentelo más tarde.');
    }
  }

  resetForm(modal: any) {                                            //Cerrar modal   
    this.resetSolicitud();
    this.modalService.dismissAll(modal);
  }

  resetSolicitud() {                                                 //Eliminar campos del form
    this.solicitud.fecha = '';
    this.solicitud.responsable = 0;
    this.solicitud.usuarioAplicativo = 0;
    this.solicitud.documento = null;
    this.solicitud.fecha = '';
    this.solicitud.fechaInicio = '';
    this.solicitud.fechaFin = '';
    this.solicitud.alias = '';
    this.solicitud.responsableUsuarioFinal = 0;
    this.file = null;
    this.funcionarios = null;                                                //Listado funcionarios 
    this.data = null;
  }

  onChangeFile(e) {                                                // Validar file y agregar a avances
    let validFormat = ['application/pdf', 'application/doc', 'application/docx'];
    let valido = false;
    for (let type of validFormat) {
      if (e.target.files[0].type === type) {
        valido = true;
        this.file = e.target.files[0];
      }
    }
    if (valido === false) {
      this.alerts(2, 'Archivo inválido', 'Los archivos admitidos son .pdf/ .doc / .docx');
    }
  }


  alerts(type, title, msg) {                                           //Alertas
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
}

