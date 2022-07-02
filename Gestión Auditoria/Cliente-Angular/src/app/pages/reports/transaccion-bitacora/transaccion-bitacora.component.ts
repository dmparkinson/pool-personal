import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../../services/bitacora.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import 'datatables.net-buttons';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-transaccion-bitacora',
  templateUrl: './transaccion-bitacora.component.html',
  styleUrls: ['./transaccion-bitacora.component.css']
})
export class TransaccionBitacoraComponent implements OnInit {

  title= 'Transaccion Bitacora'

  data: any=[];    
  result : any= []; 
  transacciones: any=[]; 
  dtElement: DataTableDirective;                    //Directiva del datatable
  dtOptions: any = [];                              //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject(); 

  mesInicio: string=  '';
  mesFinal: string = '';

  constructor(public rest:BitacoraService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {                              //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                   //Tipo de paginacion
      pageLength: 10,                               //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
      searching:false,
      dom: 'Bfrtip',
      buttons:{
        buttons: [
          {
            extend: 'pdfHtml5',
            orientation: 'landscape',
            pageSize: 'LEGAL',
            filename: 'pdfBitacora '+this.getFormatDateTime(new Date()),
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

  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }

  listarBitacora(){                            //Listar todas las transacciones
    this.rest.list(this.mesInicio,this.mesFinal).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        var tab = $('#table').DataTable();
        tab.destroy();
        this.transacciones = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        alert(this.result.success);
      }
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

}
