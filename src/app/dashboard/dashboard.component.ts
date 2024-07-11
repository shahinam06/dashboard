import { Component } from '@angular/core';
import {Chart, ChartItem} from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public chart: any;
  public lineChart1: any;
  public lineChart2: any;


  items = [
    {
      "name":"Guy Hawkins",
      "email": "@guy"
    },
    {
      "name":"Emily Johnson",
      "email": "@emily"
    },
    {
      "name":"James Smith",
      "email": "@james"
    },
    {
      "name":"Olivia Jones",
      "email": "@olivia"
    },
    {
      "name":"Ethan Davis",
      "email": "@ethen"
    },
    {
      "name":"Sophia Anderson",
      "email": "@sophia"
    },
    {
      "name":"Matthew Wilson",
      "email": "@mathew"
    },
    {
      "name":"Isabella Miller",
      "email": "@isabella"
    },
  ]
  sortedItems = [...this.items]; // Copy of items to preserve original

  sortDirection = 1; // 1 for ascending, -1 for descending
  sortIcon = '↑'; // Initial ascending icon

  
  chartDataValues: number[] = [25, 30, 25, 20, 20];
  
  

  ngOnInit(): void {
    this.createChart();
    this. createLineChart1()
    this.createLineChart2();
  }
  toggleSort() {
    this.sortDirection = -this.sortDirection; // Toggle between 1 and -1
    this.sortIcon = this.sortDirection === 1 ? '↑' : '↓'; // Change icon based on direction

    // Sort items based on name and direction
    this.sortedItems.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1 * this.sortDirection;
      }
      if (nameA > nameB) {
        return 1 * this.sortDirection;
      }
      return 0;
    });
  }
  createChart() {
    // Calculate the sum of chart data values
    const sum = this.chartDataValues.reduce((acc, value) => acc + value, 0);
    const labelsWithValues = [
      `Not Started ${this.chartDataValues[0]}`,
      `On Hold ${this.chartDataValues[1]}`,
      `Submitted ${this.chartDataValues[2]}`,
      `In Progress ${this.chartDataValues[3]}`,
      `Completed ${this.chartDataValues[4]}`
    ];

    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw: (chart: Chart<'doughnut'>) => {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        const fontSize = (height / 160).toFixed(1);
        ctx.restore();
        ctx.font = fontSize + "em sans-serif";
        ctx.fillStyle = '#212633'; 
        ctx.textBaseline = "middle";
  
        const text = `${sum}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 4.5);
        const textY = height / 1.8;
  
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    };
  
  
    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: labelsWithValues,
        datasets: [{
          data: this.chartDataValues,
          backgroundColor: [
            '#5EE173',
            '#F93535',
            '#356CF9',
            '#F9AB35',
            '#c7892c',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxHeight: 12,
              boxWidth: 12,
              usePointStyle: true,
              padding: 20,
              font: {
                size: 11, 
              },
              color: '#000000'

            },
          },
          
          title: {
            display: true,
            text: `Total: ${sum}`,
            font: { size: 14 },
            padding: 10,
          },
        },
        
      },
      plugins: [centerTextPlugin] 
    });
  }
  
  

  createLineChart1() {
    this.lineChart1 = new Chart("LineChart1", {
      type: 'line', // Type of chart
  
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "DGHR",
            data: [null, 0, 100, 200, 300, 380],
            borderColor: '#A700FF',
            backgroundColor: '#A700FF',
            tension: 0.4,// Adjust tension for curved lines (0 is straight lines, 1 is very curved)
            pointRadius: 0 // Remove points
          },
          {
            label: "Mahami",
            data: [0, 60, 100, 145, 185, 280, 320, 380],
            borderColor: '#EF4444',
            backgroundColor: '#EF4444',
            tension: 0.4,
            pointRadius: 0 // Remove points
          },
          {
            label: "Dubai Court",
            data: [null, null, null, null, null,  0, 90, 180, 280, 330, 380],
            borderColor: '#3CD856',
            backgroundColor: '#3CD856',
            tension: 0.4,
            pointRadius: 0 // Remove points
          }
        ]
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxHeight: 12,
              boxWidth: 12,
              padding: 20,
            },
          },
          title: {
            display: true,
            text: `Completed Tasks`,
            font: {
              size: 15,
              weight: 'bolder'
            },
            color: '#05004E', 
          
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false // Hide x axis gridlines
            }
          },
          y: {
            display: true,
            grid: {
              display: true // Hide y axis gridlines
            },
            beginAtZero: true,
            min: 0,
            max: 400,
            ticks: {
              stepSize: 100
            }
          }
        }
      }
    });
  }
  
  

  createLineChart2() {
    this.lineChart2 = new Chart("LineChart2", {
      type: 'line', // Type of chart
  
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "DGHR",
            data: [310, 300, 220, 140, 130, 180, 300, 310, 240, 180, 140, 120],
            borderColor: '#A700FF',
            backgroundColor: '#A700FF',
            tension: 0.4,// Adjust tension for curved lines (0 is straight lines, 1 is very curved)
            pointRadius: 0 // Remove points
          },
          {
            label: "Mahami",
            data: [250, 240, 200, 110, 150, 300, 370, 350, 280, 210, 160, 120],
            borderColor: '#EF4444',
            backgroundColor: '#EF4444',
            tension: 0.4,
            pointRadius: 0 // Remove points
          },
          {
            label: "Dubai Court",
            data: [300, 50, 40, 210, 340, 390, 300, 160, 150, 200, 340, 390],
            borderColor: '#3CD856',
            backgroundColor: '#3CD856',
            tension: 0.4,
            pointRadius: 0 // Remove points
          }
        ]
      },
      options: {
        aspectRatio: 1,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxHeight: 12,
              boxWidth: 12,
              padding: 20,
            },
          },
          title: {
            display: true,
            text: `Completed Tasks`,
            font: {
              size: 15,
              weight: 'bold' 
            },
            color: '#05004E', 
          
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false // Hide x axis gridlines
            }
          },
          y: {
            display: true,
            grid: {
              display: true // Hide y axis gridlines
            },
            beginAtZero: true,
            min: 0,
            max: 400,
            ticks: {
              stepSize: 100
            }
          }
        }
      }
    });
  }
}
