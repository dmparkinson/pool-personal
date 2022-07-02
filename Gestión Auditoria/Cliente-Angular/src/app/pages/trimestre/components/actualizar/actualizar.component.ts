import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TrimestreService } from 'src/app/pages/services/trimestre.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

/*
  Actualizar trimestre
  - Envia señal al index para que actualice la tabla trimestres
*/

@Component({
  selector: 'trimestre-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  @ViewChild('modalActualizar') private modal: TemplateRef<any>;        //Obtener el nombre del modal desde el index
  @Output () flagReload: EventEmitter<boolean> = new EventEmitter();    //Enviar señal al index para actualizar
  @Input() id: number;                                                  //Recibir del index el id del trimestre a actualizar
  @Input() trimestre: any;                                              //Obtener el trimestre a actualizar
  data: any=[];                                                         //Datos recuperados desde la BD
  title = 'Actualizar trimestre'
  modalOptions:NgbModalOptions;                                         //Modal
  
  constructor(private modalService: NgbModal,private service:TrimestreService) { 
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void {  }
   
  editarTrimestre(){                                                      //Editar un trimestre
    if(!this.trimestre.descripcion){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else{
      this.service.edit(Number(this.id),this.trimestre).subscribe(result => {
        this.data = result;
        if(this.data.success === true){
        this.alerts(1,this.data.msg, '');
        this.flagReload.emit(true);                                      //Solicitar index la reconstruccion de la tabla
        }
        else{
          this.alerts(2,'Error',this.data.msg);
          this.flagReload.emit(false);
        }
      });
      this.resetTrimestre();
    }
  } 

  resetForm(){                                                          //Cerrar Modal
    this.resetTrimestre();
    this.modalService.dismissAll(this.modal);
  }

  resetTrimestre(){                                                    //Resetar objeto trimestre
    this.trimestre.descripcion = '';
    this.id = 0;
  }

  alerts(type, title,msg){                                            //Alertas
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
