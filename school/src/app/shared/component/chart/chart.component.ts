import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions, PositionType } from 'chart.js';
import { Label } from 'ng2-charts';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() chartLabels
  @Input() chartData
  @Input() chartColors
  @Input() chartLegend = true
  @Input() isPieChart = true
  @Input() position: PositionType = 'left'
  @Input() filter = true
  @Input() suggestedMax = 100
  @Input() suggestedMin = 0
  @Input() defaultChartType

  public chartType;

  public chartOptions: ChartOptions
  masterData= MasterData

  constructor() {
  }

  ngOnInit() {

    if (!this.filter) {
      this.chartLegend = false
    }

    this.chartOptions = {
      responsive: true,
      elements:{
        point:{
          radius: this.masterData.lineChartPointRadius,
          hoverRadius: this.masterData.lineChartPointRadius+4,
          hoverBorderWidth: 2
        }
      },
      legend: {
        position: this.position,
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    }

    this.chartType = this.isPieChart ? 'doughnut' : 'bar'
    this.setChartTypeSpecificConfigurations()
    this.setChartColors()

    if(this.defaultChartType){
      this.changeChartType(this.defaultChartType)
    }

  }

  setChartColors() {

    if (!this.chartColors) {
      this.chartColors = [
        {
          backgroundColor: ['orange', 'green', 'blue', 'gray', 'maroon', 'red', 'pink', 'brown', 'cyan', 'yellow'],
        }
      ]
    }
    else if(this.chartColors[0]["pointBackgroundColor"]) {
      this.chartColors = [
        {
          backgroundColor: this.chartColors[0]["pointBackgroundColor"]
        }
      ]
    }

  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public downloadChart(event) {
    var anchor = event.target;
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "test.png";
  }

  public changeChartType(typeName) {
    //If current chart type is different than what is user asking
    // only then do something
    if(this.chartType != typeName){
      this.chartType = typeName
      this.setChartTypeSpecificConfigurations()
    }
  }

  public setChartTypeSpecificConfigurations() {

    if (this.chartType === "line") {
      this.chartColors = [
        {
          backgroundColor: [this.masterData.lineChartBgColor],
          borderColor: ['blue'],
          pointBackgroundColor: this.chartColors[0]["backgroundColor"],
          pointBorderColor: 'black'
        }
      ]
    }
    else {
      this.setChartColors()
    }

    if (this.chartType === "line" || this.chartType === "bar") {
      this.chartOptions["scales"] = {
        yAxes: [{
          ticks: {
            suggestedMax: this.suggestedMax,
            suggestedMin: this.suggestedMin
          }
        }]
      }
    }

  }

}