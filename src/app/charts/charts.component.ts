import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexDataLabels,
  ApexLegend,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  legend: ApexLegend;
};



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  public chartOptions: Partial<ChartOptions> = {};
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      this.chartOptions = {
        series: [44, 55, 41, 17, 15],
        chart: {
          type: 'donut'
        },
        labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total',
                  formatter: () => this.calculateTotal()
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          type: 'gradient'
        },
        legend: {
          position: 'bottom'
        }
      };
    }
  }

  ngOnInit(): void {}

  calculateTotal(): string {
    // Using optional chaining to safely access `series`
    return this.chartOptions.series?.reduce((a, b) => a + b, 0).toString() || '0';
  }

}
