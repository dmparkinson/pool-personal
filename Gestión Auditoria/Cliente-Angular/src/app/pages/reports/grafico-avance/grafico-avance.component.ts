import { SolicitudService } from '../../services/solicitud.service';
import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'grafico-avance',
  templateUrl: './grafico-avance.component.html',
  styleUrls: ['./grafico-avance.component.css']
})
export class GraficoAvanceComponent implements OnInit {

  title = 'Avances de solicitudes'
  description = 'Gráfica de los avances que posee cada solicitud'
  data: any=[];    
  solicitudes: any=[];
  avances: Array<any>=[];   

  // Doughnut
  public labels: Label[] = [this.solicitudes];
  public textLabel: Label[] = ['Avances'];
  public datasets: MultiDataSet = [this.avances];
  public chartType: ChartType = 'bar';
  public chartOptions: ChartOptions = { responsive: true };

  constructor(private service: SolicitudService) { }

  ngOnInit(): void {

    this.service.getAvances().subscribe(result => {
      this.data = result;
      let solicitudes = [];
      let avances = [];
      if(this.data.success === true){
        this.data.msg.forEach( function (value, key) {
          solicitudes.push(value.solicitudes);
          avances.push(value.avances);
      });
        this.labels =solicitudes ;
        this. datasets =  avances;
    }
  })
}

}
