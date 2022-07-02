import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../../services/bitacora.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'reporte-cambios-solicitud',
  templateUrl: './cambios-solicitud.component.html',
  styleUrls: ['./cambios-solicitud.component.css']
})
export class CambiosSolicitudComponent implements OnInit {

  title= 'Transacciones de Actualizacion';

  data: any=[];    
  result : any= []; 
  transacciones: any=[]; 

  dtElement: DataTableDirective;                    //Directiva del datatable
  dtOptions: any = [];                              //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  constructor(public rest:BitacoraService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.dtOptions = {                              //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                   //Tipo de paginacion
      pageLength: 10,                               //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
      searching:false,
    }  
    this.listarBitacora();

  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
  }

  listarBitacora(){                            //Listar todas las transacciones
    this.rest.bitacoraActualizacion().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.transacciones = this.data.msg;
        this.tableTrigger.next();
      }
      else{
        alert(this.result.success);
      }
    });
  } 

}
