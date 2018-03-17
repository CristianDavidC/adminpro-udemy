import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  public doughnutChartLabels:string[];
  public doughnutChartData:number[];
  public doughnutChartType:string;
  public leyenda: string = "Leyenda"
  
  @Input() item: any;

  constructor() { 
    
  }

  ngOnInit() {
    this.doughnutChartData = this.item.data;
    this.doughnutChartLabels = this.item.labels;
    this.doughnutChartType = this.item.type;
    this.leyenda = this.item.leyenda;
    // console.log(this.item);
  }

}
