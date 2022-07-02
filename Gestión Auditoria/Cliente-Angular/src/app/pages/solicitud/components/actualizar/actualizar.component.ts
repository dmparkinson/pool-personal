import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SolicitudService } from 'src/app/pages/services/solicitud.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

/*
  Actualizar solicitud
  - Envia señal al index para que actualice la tabla solicitudes
*/

@Component({
  selector: 'solicitud-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  @ViewChild('modalActualizar') private modal: TemplateRef<any>;         //Obtener el nombre del modal desde el index
  @Output() flagReload: EventEmitter<boolean> = new EventEmitter();     //Enviar señal al index para actualizar
  @Input() id: number;                                                   //Recibir del index el id de la solicitud a actualizar
  @Input() solicitud: any;                                               //Obtener la solicitud a actualizar  
  @Input() funcionarios: any;                                            //Listado funcionarios 

  file: File;
  data: any = [];                                                          //Datos recuperados desde la BD
  title = 'Actualizar solicitud'
  modalOptions: NgbModalOptions;                                          //Modal

  constructor(private modalService: NgbModal, private service: SolicitudService) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit(): void {
    this.file = null;
  }

  editarSolicitud() {                                                           //Editar una solicitud
    if (!this.id || !this.solicitud.alias || !this.solicitud.responsable || !this.solicitud.usuarioAplicativo
      || !this.solicitud.responsableUsuarioFinal || !this.solicitud.fechaInicio || !this.solicitud.fechaFin) {
      this.alerts(3, 'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else {
      if (this.solicitud.fechaInicio < this.solicitud.fechaFin) {
        this.solicitud.fecha = this.getFormatDateTime(new Date());
        let formData = new FormData();                                        // Crear Form-data
        formData.append('file', this.file);
        formData.append('data', JSON.stringify(this.solicitud));
        this.service.edit(Number(this.id), formData).subscribe(result => {
          this.data = result;
          if (this.data.success === true) {
            this.alerts(1, this.data.msg, '');
            this.flagReload.emit(true);                                           //Solicitar index la reconstruccion de la tabla
          }
          else {
            this.alerts(2, 'Error solicitud', this.data.msg);
            this.flagReload.emit(false);
          }
        })
      } else {
        this.alerts(3, 'Error en las fehcas', 'La fecha de inicio debe ser anterior a la fecha final.');
      }

    }
  }

  check(isChecked: Boolean){
    if (isChecked) {
      this.solicitud.finalizado = 1;

    } else {
      this.solicitud.finalizado = 0;
    }
  }
  resetForm() {
    this.resetSolicitud();
    this.modalService.dismissAll(this.modal);
  }

  resetSolicitud() {                                                       //Eliminar campos del form
    this.solicitud = null
    this.file = null;
    this.funcionarios = null;
    this.id = 0
  }

  abrirFile() {                                                      //Obtener y abrir archivo
    this.service.getFile(this.solicitud.documento).subscribe(result => {
      const fileURL = URL.createObjectURL(result);
      window.open(fileURL);
    });
  }

  onChangeFile(e) {                                                    // Validar file y agregar a solicitud
    let validFormat = ['application/pdf', 'application/doc', 'application/docx'];
    let size = 32;
    let valido = false;
    if (size > 20) {                                                    //Si cumple con el tamaño
      for (let type of validFormat) {
        if (e.target.files[0].type === type) {
          valido = true;
          this.file = e.target.files[0];
        }
      }
    }
    if (valido === false) {
      this.alerts(2, 'Archivo inválido', 'Los archivos admitidos son .pdf/ .doc / .docx');
    }
  }

  getFormatDateTime(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth()+ 1;
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

  alerts(type, title, msg) {                                                //Alertas
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

