import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficaDona',
  templateUrl: './graficaDona.component.html'
})
export class GraficaDonaComponent implements OnInit {

  @Input('labels') doughnutChartLabels: Label[] = [];
  @Input('data') doughnutChartData: MultiDataSet = [];
  @Input('type') doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
    console.log(this.doughnutChartData)
  }

}
