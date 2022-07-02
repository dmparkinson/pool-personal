import { Component, OnInit } from '@angular/core';
import { AvanceService } from '../../services/avance.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avance-trimestral',
  templateUrl: './avance-trimestral.component.html',
  styleUrls: ['./avance-trimestral.component.css']
})
export class AvanceTrimestralComponent implements OnInit {

  title = 'Avance trimestral'

  solicitud = 0;
  trimestre = 0;

  data: any=[];     
  avances: any = []; 
  dtElement: DataTableDirective;                                //Directiva del datatable
  dtOptions: any = [];                                          //Configuracion del datatable
  tableTrigger: Subject<any>= new Subject();

  constructor(private activatedRoute: ActivatedRoute, private service:AvanceService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.solicitud = params.id_solicitud;

        });

    this.dtOptions = {                              //Configuracion del contenido del datatable
      pagingType: 'full_numbers',                   //Tipo de paginacion
      pageLength: 10,                               //Cantidad de filas mostradas
      "language": {"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" }, // Lenguaje
      processing: true,
      searching:false,
    }    

  }

  ngOnDestroy(): void {
    this.tableTrigger.unsubscribe();
    
  }


  listarAvances(){                                                 //Listar todos los avances
    this.service.avanceTrimesral(this.solicitud, this.trimestre).subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        var tab = $('#table').DataTable();
        tab.destroy();
        this.avances = this.data.msg;
        this.tableTrigger.next();
      }
      else{
      //  this.alerts(2,'Error',this.data.msg);
      }
    });
  } 

  abrirFile( documento ){                                     //Obtener y abrir archivo
    this.service.getFile(documento).subscribe(result => {
      const fileURL = URL.createObjectURL(result);
      window.open(fileURL);
    });
  }


}
