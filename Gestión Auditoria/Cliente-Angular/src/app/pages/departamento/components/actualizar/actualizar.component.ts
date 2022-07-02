import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DepartamentoService } from '../../../services/departamento.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

/*
  Actualizar departamento
  - Envia señal al index para que actualice la tabla departamentos
*/

@Component({
  selector: 'departamento-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  @ViewChild('modalActualizar') private modal: TemplateRef<any>;        //Obtener el nombre del modal desde el index
  @Output () flagReload: EventEmitter<boolean> = new EventEmitter();    //Enviar señal al index para actualizar
  @Input() id: number;                                                  //Recibir del index el id del departamento a actualizar
  @Input() departamento: any;                                           //Obtener el departamento a actualizar
  data: any=[];                                                         //Datos recuperados desde la BD
  title = 'Actualizar departamento'
  modalOptions:NgbModalOptions;                                         //Modal

  constructor(private modalService: NgbModal,private service:DepartamentoService) { 
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void {}
   
   editarDepartamento(){                                              //Editar un departamento
    if(!this.departamento.nombre){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else{
      this.service.edit(Number(this.id),this.departamento).subscribe(result => {
        this.data = result;
        if(this.data.success === true){
        this.alerts(1,this.data.msg, '');
        this.flagReload.emit(true);                                   //Solicitar index la reconstruccion de la tabla
        }
        else{
          this.alerts(2,'Error',this.data.msg);
          this.flagReload.emit(false);
        }
      });
      this.resetDepartamento();
    }
  } 

  resetForm(){                                                        //Cerrar Modal
    this.resetDepartamento();
    this.modalService.dismissAll(this.modal);
  }

  resetDepartamento(){                                                //Resetar objeto departamento
    this.departamento.nombre = '';
    this.departamento.eliminado = 0;
    this.id = 0;
  }

  alerts(type, title,msg){                                           //Alertas
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
