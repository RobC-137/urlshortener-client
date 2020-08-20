import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data;

  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  timeFormat = 'DD/MM/YYYY';

  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            parser: 'MM/DD/YYYY',
            tooltipFormat: 'll',
            unit: 'day',
            unitStepSize: 1,
            displayFormats: {
              day: 'MM/DD/YYYY',
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Clicks',
          },
          ticks: {
            beginAtZero: true, // minimum value will be 0.
          },
        },
      ],
    },
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(125,125,125,0.8)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'bar';
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.data) {
      this.lineChartData = [
        {
          data: this.data.map((o) => o.count),
        },
      ];
      this.lineChartLabels = this.data.map((o) => new Date(o.date));
    }
  }
}
