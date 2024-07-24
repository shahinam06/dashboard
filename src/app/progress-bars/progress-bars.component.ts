import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bars',
  template: `
    <div class="progress-container">
      <div class="progress-bars">
        <div class="progress-bar bg-success" [style.width.%]="data.count1 / getTotal() * 100"></div>
        <div class="progress-bar bg-info" [style.width.%]="data.count2 / getTotal() * 100"></div>
        <div class="progress-bar bg-warning" [style.width.%]="data.count3 / getTotal() * 100"></div>
        <div class="progress-bar bg-danger" [style.width.%]="data.count4 / getTotal() * 100"></div>
        <div class="progress-bar bg-primary" [style.width.%]="data.count5 / getTotal() * 100"></div>
      </div>
      <div class="total">
        {{ getTotal() }}
      </div>
    </div>
  `,
  styles: [
    `
    .progress-container {
      display: flex;
      align-items: center;
    }

    .progress-bars {
      display: flex;
      height: 10px;
      width: 70%; /* Adjust width as needed */
      margin-right: 10px; /* Add margin for spacing */
      border-radius: 20px; /* Add border radius */
      overflow: hidden; /* Ensure overflow is hidden */
      background: gray;
    
    }

    .progress-bar {
      height: 100%;
      cursor: pointer;

    }

    .total {
      font-weight: bold;
    }

    .bg-success {
      background-color: #28a745;
    }

    .bg-info {
      background-color: #17a2b8;
    }

    .bg-warning {
      background-color: #ffc107;
    }

    .bg-danger {
      background-color: #dc3545;
    }

    .bg-primary {
      background-color: #007bff;
    }
    `
  ]
})
export class ProgressBarsComponent {
  @Input() data: any;

  constructor() { }

  getTotal() {
    return this.data.count1 + this.data.count2 + this.data.count3 + this.data.count4 + this.data.count5;
  }
}
