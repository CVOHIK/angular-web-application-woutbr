import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input('datasets') public lineChartData: ChartDataSets[];
  @Input('labels') public lineChartLabels: Label[];
  @Input('options') public lineChartOptions: (ChartOptions & { annotation: any });
  @Input('colors') public lineChartColors: Color[];
  public lineChartLegend = false;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() { }

  ngOnInit() {
  }

  removeData(){
    this.chart.labels.pop();
    this.chart.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    this.chart.update();
  }

  update(){
    console.log(this.chart.data);
    console.log(this.chart.datasets);
    
    this.chart.update();
  }

}
