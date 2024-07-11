import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public chart: any;
  public lineChart: any;
  public lineChart1: any;

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

  
  chartDataValues: number[] = [25, 30, 25, 20];
  

  ngOnInit(): void {
    this.createChart();
    this.createLineChart();
    this. createLineChart1()
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
  
    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: ['On Hold', 'Submitted', 'In Progress', 'Not Started'],
        datasets: [{
          data: this.chartDataValues,
          backgroundColor: [
            'red',
            'blue',
            'orange',
            'green',
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
            },
          },
          title: {
            display: true,
            text: `Total: ${sum}`, // Display total sum in chart title
            font: { size: 14 },
            padding: 10,
          },
        },
      },
    });
  }
  
  

  createLineChart(){
  
    this.lineChart = new Chart("MyLineChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Jan', 'Feb', 'Mar','Apr', 'May', 'June',
								 'July', 'Aug', 'Sep','Oct', 'Nov', 'Dec'], 
	       datasets: [
          {
            label: "DGHR",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'violet'
          },
          {
            label: "Mahami",
            data: ['0', '98', '100', '110', '200',
									 '250', '538', '541'],
            backgroundColor: 'red'
          }  ,
          {
            label: "Dubai Court",
            data: ['17', '19', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:1,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 1000,
            ticks: {
              stepSize: 100
            }
          }
        }
      }
      
    });
  }

  createLineChart1(){
  
    this.lineChart1 = new Chart("LineChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Jan', 'Feb', 'Mar','Apr', 'May', 'June',
								 'July', 'Aug', 'Sep','Oct', 'Nov', 'Dec'], 
	       datasets: [
          {
            label: "DGHR",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'violet'
          },
          {
            label: "Mahami",
            data: ['0', '98', '100', '110', '200',
									 '250', '538', '541'],
            backgroundColor: 'red'
          }  ,
          {
            label: "Dubai Court",
            data: ['17', '19', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:1,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 1000,
            ticks: {
              stepSize: 100
            }
          }
        }
      }
      
    });
  }
}
