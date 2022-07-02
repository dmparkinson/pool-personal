import { FuncionarioService } from 'src/app/pages/services/funcionario.service';
import { SolicitudService } from 'src/app/pages/services/solicitud.service';
import { TrimestreService } from 'src/app/pages/services/trimestre.service'; 
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AvanceService } from 'src/app/pages/services/avance.service'; 
import { Avance } from 'src/app/pages/interfaces/avance'; 
import Swal from 'sweetalert2';

/*
  Agregar un nuevo avance
  - Envia una señal al index para actualizar tabla en caso de completar 
    correctamente el registro del avance
*/

@Component({
  selector: 'avance-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  @Output () flagReload: EventEmitter<boolean> = new EventEmitter();   //Pedido para actualizar tabla al index
  avance: Avance = {                                                   //Objeto avance
    trimestre: 0,
    usuarioAplicativo: 0,
    solicitud: 0,
    documento: null,
    fecha: ''
    };
  solicitudFinalizada = 0;
  file: File;
  solicitudes: any;                                                   //Listado solicitudes
  funcionarios: any;                                                  //Listado funcionarios 
  trimestres: any;                                                    //Listado trimestres
  data: any=[];                                                       //Datos recuperados de BD
  title = 'Registrar avance';
  modalOptions:NgbModalOptions;                                       //Modal
  
  
  constructor(private modalService: NgbModal,private service:AvanceService, private serviceTrim: TrimestreService,
    private serviceFun: FuncionarioService, private serviceSol: SolicitudService) { 
    this.modalOptions = {                                          
      backdrop:'static',
      backdropClass:'customBackdrop'
      }
  }

  ngOnInit(): void { }
   
  agregarAvance(){                                                    //Crear un nuevo avance
    if(!this.avance.trimestre || !this.avance.usuarioAplicativo || !this.avance.solicitud){
      this.alerts(3,'Formato incorrecto', 'El campo posee formato incorrecto o vacío.'  );
    }
    else{
      this.avance.fecha = this.getFormatDateTime(new Date());
      let formData = new FormData();                                      // Crear Form-data
      formData.append('file', this.file);                                 //Agregar File a un form-data para ser leido por API
      formData.append('data', JSON.stringify(this.avance) ); 
      formData.append('solicitudEstado', JSON.stringify(this.solicitudFinalizada) ); 
      if(this.data.success === true){                                   // Si se registro entonces recibir el nombre del File
        this.avance.documento = this.data.msg;                          // Agregar nombre del File a avances. documento
        this.service.add(formData).subscribe(result => {             // Registrar un nuevo avance
          this.data = result;
          if(this.data.success === true){                               // Si se registro correctamente
            this.alerts(1,this.data.msg, '');
            this.flagReload.emit(true);                                 //Enviar señal para actualizar tabla
            this.resetAvance();
          }
          else{
            this.alerts(2,'Error',this.data.msg);
            this.flagReload.emit(false);
          }
        });
      }
    }
  }

  check(isChecked: Boolean){
    if (isChecked) {
      this.solicitudFinalizada = 1;

    } else {
      this.solicitudFinalizada = 0;
    }
  }

  listarFuncionarios(){                                             //Obtener lista funcionarios
    return this.serviceFun.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.funcionarios =  this.data.msg;
      }
      else{
      }
    });
  } 

  listarTrimestres(){                                               //Listar todos los trimestre
    this.serviceTrim.list().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.trimestres = this.data.msg;
      }
      else{
        console.log('trimestres no cargados')
        //this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  listarSolicitudes(){                                            //Listar todos las solicitudes
    this.serviceSol.listPendiente().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.solicitudes = this.data.msg;
      }
      else{
        console.log('solicitudes no cargados')
       // this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  abrirmodalAgregar(modal: any){                                  //Abrir modal de agregar
    this.resetAvance();                                           //Resetear campos antes de abrir modal
    try{
      this.listarFuncionarios();
      this.listarTrimestres();
      this.listarSolicitudes();
      this.modalService.open(modal);                               //Abrir modal
    }catch(e){
      this.alerts(3, 'Error inesperado','Porfavor intentelo más tarde.');   
    }
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

  resetForm(modal: any){                                          //Cerrar modal   
    this.resetAvance(); 
    this.modalService.dismissAll(modal);                        
  }

  resetAvance(){                                                  //Eliminar campos del form
    this.avance.trimestre =  0;
    this.avance.fecha = '';
    this.avance.usuarioAplicativo =  0;
    this.avance.solicitud =  0;
    this.avance.documento =  null;
   // this.solicitudFinalizada = 0;
    this.file = null;
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

  alerts(type, title,msg){                                        //Alertas
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

