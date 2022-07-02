import { TrimestreService } from 'src/app/pages/services/trimestre.service'; 
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Trimestre } from 'src/app/pages/interfaces/trimestre'; 
import Swal from 'sweetalert2';

/*
  Agregar un nuevo trimestre
  - Envia una señal al index para actualizar tabla en caso de completar 
    correctamente el registro del trimestre
*/



@Component({
  selector: 'trimestre-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  
  @Output () flagReload: EventEmitter<boolean> = new EventEmitter(); //Pedido para actualizar tabla al index
  trimestre : Trimestre = {                                         //Objeto trimestre
    descripcion : '',
  }
  data: any=[];                                                     //Datos recuperados de BD
  title = 'Registrar trimestre';
  modalOptions:NgbModalOptions;                                     //Modal

  constructor(private modalService: NgbModal,private service:TrimestreService) { 
    this.modalOptions = {                                          
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void { }
  
  registrarTrimestre(){                                             //Crear un nuevo trimestre
    if(!this.trimestre.descripcion){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else{
      this.service.add(this.trimestre).subscribe(result => {
        this.data = result;
        if(this.data.success === true){
         this.alerts(1,this.data.msg, '');
         this.flagReload.emit(true);                                  //Enviar señal para actualizar tabla
        }
        else{
          this.alerts(2,'Error',this.data.msg);
          this.flagReload.emit(false);
        }
      });
      this.resetTrimestre();
    }
  } 
  
  abrirmodalAgregar(modal: any){                                      //Abrir modal de agregar
    this.resetTrimestre();                                            //Resetear campos antes de abrir modal
    this.modalService.open(modal);                                    //Abrir modal
  }

  resetForm(modal: any){                                              //Cerrar modal   
    this.resetTrimestre();  
    this.modalService.dismissAll(modal);                        
  }

  resetTrimestre(){                                                 //Eliminar campos del form
    this.trimestre.descripcion = '';
  }

  alerts(type, title,msg){                                          //Alertas
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





