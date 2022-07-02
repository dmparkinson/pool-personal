import { TransaccionService } from 'src/app/pages/services/transaccion.service'; 
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Transaccion } from 'src/app/pages/interfaces/transaccion';
import Swal from 'sweetalert2';

/*
  Agregar una nueva transaccion
  - Envia una señal al index para actualizar tabla en caso de completar 
    correctamente el registro de transaccion
*/

@Component({
  selector: 'transaccion-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  
  @Output () flagReload: EventEmitter<boolean> = new EventEmitter();    //Pedido para actualizar tabla al index
  transaccion : Transaccion = {                                         //Objeto transaccion
    descripcion : '',
  }
  data: any=[];                                                         //Datos recuperados de BD
  title = 'Registrar transaccion';
  modalOptions:NgbModalOptions;                                         //Modal

  constructor(private modalService: NgbModal,private service:TransaccionService) { 
    this.modalOptions = {                                          
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void { }
  
  registrarTransaccion(){                                                 //Crear una nueva transaccion
    if(!this.transaccion.descripcion){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else{
      this.service.add(this.transaccion).subscribe(result => {
        this.data = result;
        if(this.data.success === true){
         this.alerts(1,this.data.msg, '');
         this.flagReload.emit(true);                                      //Enviar señal para actualizar tabla
        }
        else{
          this.alerts(2,'Error',this.data.msg);
          this.flagReload.emit(false);
        }
      });
      this.resetTransaccion();
    }
  } 
  
  abrirmodalAgregar(modal: any){                                          //Abrir modal de agregar
    this.resetTransaccion();                                                //Resetear campos antes de abrir modal
    this.modalService.open(modal);                                        //Abrir modal
  }

  resetForm(modal: any){                                                  //Cerrar modal   
    this.resetTransaccion();  
    this.modalService.dismissAll(modal);                        
  }

  resetTransaccion(){                                                       //Eliminar campos del form
    this.transaccion.descripcion = '';
  }

  alerts(type, title,msg){                                                //Alertas
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





