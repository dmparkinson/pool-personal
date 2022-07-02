import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AvanceService } from 'src/app/pages/services/avance.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

/*
  Actualizar avance
  - Envia señal al index para que actualice la tabla avances
*/

@Component({
  selector: 'avance-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  @ViewChild('modalActualizar') private modal: TemplateRef<any>;         //Obtener el nombre del modal desde el index
  @Output () flagReload: EventEmitter<boolean> = new EventEmitter();     //Enviar señal al index para actualizar
  @Input() id: number;                                                   //Recibir del index el id del departamento a actualizar
  @Input() avance: any;                                                  //Obtener el avance a actualizar  
  @Input() solicitudes: any;                                             //Listado solicitudes
  @Input() funcionarios: any;                                            //Listado funcionarios 
  @Input() trimestres: any;                                              //Listado trimestres

  file: File;
  data: any=[];                                                          //Datos recuperados desde la BD
  title = 'Actualizar avance'
  modalOptions:NgbModalOptions;                                          //Modal

  constructor(private modalService: NgbModal,private service:AvanceService) { 
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void {
    this.file = null;
  }

  editarAvance(){
    if(!this.avance.trimestre || !this.avance.usuarioAplicativo || !this.avance.solicitud ){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.'  );
    }else{
      this.avance.fecha = this.getFormatDateTime(new Date());
      let formData = new FormData();                                        // Crear Form-data
      formData.append('file', this.file);  
      formData.append('data', JSON.stringify(this.avance) ); 
      this.service.edit(Number(this.id),formData).subscribe(result => {  
        this.data = result;
        if(this.data.success === true){
          this.alerts(1,this.data.msg, '');
          this.flagReload.emit(true);                                           //Solicitar index la reconstruccion de la tabla
        }
        else{
          this.alerts(2,'Error',this.data.msg);
          this.flagReload.emit(false);
        }
      })  
    }
  }

  resetForm(){      
    this.resetAvance();
    this.modalService.dismissAll(this.modal);
  }

  resetAvance(){                                                      //Resetar objeto avance
    this.avance.trimestre =  0;
    this.avance.fecha = '';
    this.avance.usuarioAplicativo =  0;
    this.avance.solicitud =  0;
    this.avance.documento =  null;
    this.file = null;
  }

  getFormatDateTime(date){
    var curr_date = date.getDate();
    var curr_month = date.getMonth()+1;
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

  abrirFile(  ){                                     //Obtener y abrir archivo
    this.service.getFile(this.avance.documento).subscribe(result => {
      const fileURL = URL.createObjectURL(result);
      window.open(fileURL);
    });
  }

  onChangeFile(e){                                                // Validar file y agregar a avances
    let validFormat = [ 'application/pdf', 'application/doc', 'application/docx' ];
    let valido = false;
    for (let type of validFormat){
      if(e.target.files[0].type === type){
        valido = true;
        this.file = e.target.files[0];
      }
    }
    if(valido === false){
      this.alerts(2, 'Archivo inválido','Los archivos admitidos son .pdf/ .doc / .docx');
    }
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

