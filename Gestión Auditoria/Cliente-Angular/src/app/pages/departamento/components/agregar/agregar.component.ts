import { DepartamentoService } from '../../../services/departamento.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from '../../../interfaces/departamento';
import Swal from 'sweetalert2';

/*
  Agregar un nuevo departamento
  - Envia una señal al index para actualizar tabla en caso de completar 
    correctamente el registro del departamento
*/

@Component({
  selector: 'departamento-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  @Output () flagReload: EventEmitter<boolean> = new EventEmitter(); //Pedido para actualizar tabla al index
  departamento : Departamento = {                                    //Objeto departamento
    nombre : '',
    eliminado: 0,
  }
  data: any=[];                                                     //Datos recuperados de BD
  id =0;
  title = 'Registrar departamentos';
  modalOptions:NgbModalOptions;                                     //Modal

  constructor(private modalService: NgbModal,private service:DepartamentoService) { 
    this.modalOptions = {                                          
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void { }
  
  registrarDepartamento(){                                          //Crear un nuevo departamento
    this.departamento.eliminado = 0;                                //Evitar que el objeto nuevo se elimine al crearlo
    if(!this.departamento.nombre){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.');
    }
    else{
      this.service.add(this.departamento).subscribe(result => {
        this.data = result;
        if(this.data.success === true){
         this.alerts(1,this.data.msg, '');
         this.flagReload.emit(true);                                //Enviar señal para actualizar tabla
        }
        else{
          this.alerts(2,'Error',this.data.msg);
          this.flagReload.emit(false);
        }
      });
      this.resetDepartamento();
    }
  } 
  
  abrirmodalAgregar(modal: any){                                  //Abrir modal de agregar
    this.resetDepartamento();                                     //Resetear campos antes de abrir modal
    this.modalService.open(modal);                                //Abrir modal
  }

  resetForm(modal: any){                                          //Cerrar modal   
    this.resetDepartamento(); 
    this.modalService.dismissAll(modal);                        
  }

  resetDepartamento(){                                           //Eliminar campos del form
    this.departamento.nombre = '';
    this.departamento.eliminado = 0;
    this.id = 0;
  }

  alerts(type, title,msg){                                      //Alertas
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




