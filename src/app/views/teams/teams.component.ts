import { Component, OnInit } from '@angular/core';
import {log} from 'util';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public radarChartLabels: string[] = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];

  public radarOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public options = {
    responsive: true,
    scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
        }
    }
  };

  public radarChartData: any = [
    {data: [100, 81, 56, 55, 80], label: 'You'},
    {data: [90, 79, 96, 87, 100], label: 'Average'},
    // {data: [0]}
  ];
  public radarChartType = 'radar';

  constructor() { }

  ngOnInit() {
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
