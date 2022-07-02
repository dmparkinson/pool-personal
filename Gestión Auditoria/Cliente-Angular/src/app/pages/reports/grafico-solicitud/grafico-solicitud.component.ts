import { SolicitudService } from '../../services/solicitud.service';
import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'grafico-solicitud',
  templateUrl: './grafico-solicitud.component.html',
  styleUrls: ['./grafico-solicitud.component.css']
})
export class GraficoSolicitudComponent implements OnInit {

  title = 'Estado solicitudes'
  description = 'En el presente gráfico se representa el estado de solicitudes pendientes y finalizadas.'
  pendientes: number =0;
  finalizadas: number =0;
  data: any=[];

   // Doughnut
   public chartLabels: Label[] = ['pendientes', 'finalizadas'];
   public chartData:MultiDataSet = [ [this.pendientes, this.finalizadas]  ];
   public chartType: ChartType = 'doughnut';
   public chartOptions: any = { responsive: true };

  constructor(private service: SolicitudService) { }

  ngOnInit(): void {

    this.service.getState().subscribe(result => {
      this.data = result;
      if(this.data.success === true){
        this.pendientes =  this.data.msg[0].pendientes;
        this.finalizadas = this.data.msg[0].finalizados;
        this.chartData = [ [this.pendientes, this.finalizadas]  ];
      }
    })
  }
  



}
