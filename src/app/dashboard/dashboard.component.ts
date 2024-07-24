import { AfterViewInit, Component, Input } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';
import { MatTableDataSource } from '@angular/material/table';
// import 'chartjs-plugin-linear-progress';
// Chart.register(ChartDataLabels);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent {



  @Input() progress: any;

  getColor(status: string) {
    const colorMap: { [key: string]: string } = {
      success: "green",
      warning: "yellow",
      error: "red"
    };
    return colorMap[status];
  }

 
  public chart: any;
  public lineChart1: any;
  public lineChart2: any;

  values = [
    { icon: 'projects_icon.svg', label: 'Projects', value: 12 },
    { icon: 'leads_icon.svg', label: 'Leads', value: 12 },
    { icon: 'bell_icon.svg', label: 'Teams', value: 12 },
  ];

  items = [
    {
      "name": "Guy Hawkins",
      "email": "@guy"
    },
    {
      "name": "Emily Johnson",
      "email": "@emily"
    },
    {
      "name": "James Smith",
      "email": "@james"
    },
    {
      "name": "Olivia Jones",
      "email": "@olivia"
    },
    {
      "name": "Ethan Davis",
      "email": "@ethen"
    },
    {
      "name": "Sophia Anderson",
      "email": "@sophia"
    },
    {
      "name": "Matthew Wilson",
      "email": "@mathew"
    },
    {
      "name": "Isabella Miller",
      "email": "@isabella"
    },
  ]
  sortedItems = [...this.items]; // Copy of items to preserve original

  sortDirection = 1; // 1 for ascending, -1 for descending
  sortIcon = '↑↓'; // Initial ascending icon


  chartDataValues: number[] = [25, 30, 25, 20, 20];
  displayedColumns: string[] = ['index', 'counts'];
  countData = [
    { count1: 0, count2: 0, count3: 0, count4: 0, count5: 0 },
    { count1: 10, count2: 20, count3: 25, count4: 41, count5: 55 },
    { count1: 90, count2: 20, count3: 25, count4: 30, count5: 35 },
    { count1: 5, count2: 10, count3: 15, count4: 80, count5: 25 },
    { count1: 8, count2: 12, count3: 27, count4: 20, count5: 24 },
    // Only 5 objects as required
  ];

  dataSource = new MatTableDataSource<any>(this.countData);

  ngOnInit(): void {
    this.createChart();
    this.createLineChart1()
    this.createLineChart2();
  }
  getTotal(obj: any) {
    // Calculate the sum of count1 to count5 for a specific object
    return obj.count1 + obj.count2 + obj.count3 + obj.count4 + obj.count5;
  }
  toggleSort() {
    this.sortDirection = -this.sortDirection; // Toggle between 1 and -1
    this.sortIcon = this.sortDirection === 1 ? '↑' : '↓';

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
      `${this.chartDataValues[0]} Not Started`,
      `${this.chartDataValues[1]} On Hold`,
      `${this.chartDataValues[2]} Submitted`,
      `${this.chartDataValues[3]} In Progress`,
      `${this.chartDataValues[4]} Completed`
    ];

    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw: (chart: Chart<'doughnut'>) => {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        const fontSize = (height / 150).toFixed(1);
        ctx.restore();
        ctx.font = fontSize + "em sans-serif";
        ctx.fillStyle = '#212633';
        ctx.textBaseline = "middle";

        const text = `${sum}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 4.3);
        const textY = height /2;

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
        cutout: '70%',
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              boxHeight: 8,
              boxWidth: 8,
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                family: 'Dubai-Regular'
              },
              color: '#000000',

            },
          },

          title: {
            // display: true,
            // text: `Total: ${sum}`,
            font: {
               size: 20,
               family: 'Dubai-Bold'
             },
            padding: 10,
          },
        },

      },

      plugins: [centerTextPlugin]
    });
  }

   

  addHighestPointDot(datasets: any[]) {
    datasets.forEach((dataset) => {
      const highestPointIndex = dataset.data.indexOf(Math.max(...dataset.data));
      dataset.pointRadius = new Array(dataset.data.length).fill(0) as (number | never[]);
      (dataset.pointRadius as number[])[highestPointIndex] = 5;
    });
  }

  datapointLinesPlugin = {
    id: 'datapointLines',
    beforeDatasetsDraw(chart: { data?: any; ctx?: any; scales?: any; chartArea?: any; }, args: any, plugins: any) {
      const { ctx, scales: { x, y }, chartArea: { bottom } } = chart;
      ctx.save();
      chart.data.datasets.forEach((dataset: { data: number[]; borderColor: any; }, datasetIndex: any) => {
        const highestPoint = Math.max(...dataset.data.filter(value => value !== null));
        const index = dataset.data.indexOf(highestPoint);
        ctx.beginPath();
        ctx.strokeStyle = dataset.borderColor; // Use the dataset's border color
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]); // Add this line to make the line dotted
        ctx.moveTo(x.getPixelForValue(index), y.getPixelForValue(highestPoint));
        ctx.lineTo(x.getPixelForValue(index), bottom);
        ctx.stroke();
      });
    }
  };


  createLineChart1() {

    const datasets = [
      {
        label: "DGHR",
        data: [null, 0, 100, 200, 300, 380],
        borderColor: '#A700FF',
        backgroundColor: '#A700FF',
        tension: 0.2,// Adjust tension for curved lines (0 is straight lines, 1 is very curved)
        pointRadius: [], // Remove points
      },
      {
        label: "Mahami",
        data: [0, 60, 100, 145, 185, 280, 320, 380],
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
        tension: 0.4,
        pointRadius: []
      },
      {
        label: "Dubai Court",
        data: [null, null, null, null, null, 0, 90, 180, 280, 330, 380],
        borderColor: '#3CD856',
        backgroundColor: '#3CD856',
        tension: 0.2,
        pointRadius: []
      }
    ]
    this.addHighestPointDot(datasets);

    this.lineChart1 = new Chart("LineChart1", {
      type: 'line', // Type of chart

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: datasets

      },
      options: {
        aspectRatio: 1,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        plugins: {

          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxHeight: 6,
              boxWidth: 6,
              padding: 20,
              font: {
                size: 12,
                family: 'Dubai-Regular'
              },
              color: '#464E5F'
            },
          },
          title: {
            display: true,
            text: `Completed Tasks`,
            font: {
              size: 20,
              weight: 'bolder',
              family: 'Dubai-Bold'
            },
            color: '#05004E',
            align: 'start',
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
              display: true
            },
            beginAtZero: true,
            min: 0,
            max: 400,
            ticks: {
              stepSize: 100
            }
          }
        },

      },

      plugins: [this.datapointLinesPlugin]

    });

  }



  createLineChart2() {
    const datasets = [
      {
        label: "DGHR",
        data: [310, 300, 220, 140, 130, 180, 300, 310, 240, 180, 140, 120],
        borderColor: '#A700FF',
        backgroundColor: '#A700FF',
        tension: 0.4,
        pointRadius: 0
      },
      {
        label: "Mahami",
        data: [250, 240, 200, 110, 150, 300, 370, 350, 280, 210, 160, 120],
        borderColor: '#EF4444',
        backgroundColor: '#EF4444',
        tension: 0.4,
        pointRadius: []
      },
      {
        label: "Dubai Court",
        data: [300, 48, 40, 210, 340, 380, 300, 160, 150, 200, 340, 380],
        borderColor: '#3CD856',
        backgroundColor: '#3CD856',
        tension: 0.4,
        pointRadius: 0
      }
    ];
    this.addHighestPointDot(datasets);

    this.lineChart2 = new Chart("LineChart2", {
      type: 'line',

      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: datasets
      },
      options: {
        aspectRatio: 1,

        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxHeight: 6,
              boxWidth: 6,
              padding: 20,
              font: {
                size: 12,
                family: 'Dubai-Regular'
              },
              color: '#464E5F'
            },
          },
          title: {
            display: true,
            text: `Completed Tasks`,
            font: {
              size: 20,
              // weight: 'bold',
              family: 'Dubai-Bold',


            },
            color: '#05004E',
            align: 'start',

          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
          },
          y: {
            display: true,
            grid: {
              display: true,
            },
            beginAtZero: true,
            min: 0,
            max: 400,
            ticks: {
              stepSize: 100
            }
          }
        }
      },
      plugins: [this.datapointLinesPlugin]

    });
  }
}
