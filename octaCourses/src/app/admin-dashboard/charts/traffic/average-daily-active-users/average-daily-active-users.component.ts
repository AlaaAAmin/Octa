import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-average-daily-active-users',
  templateUrl: './average-daily-active-users.component.html',
  styleUrls: ['./average-daily-active-users.component.css']
})
export class AverageDailyActiveUsersComponent implements OnInit {

  // line chart bottom labels
  public lineChartLabels = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // line chart type
  public lineChartType = 'line';
  
  // line chart legend
  public lineChartLegend = true;
  
  // line chart data set
  public lineChartData = [
    {
      data: [10, 50, 60, 200, 85, 55, 300],
      label: 'Average daily active users'
    }
  ]

  //line chart options
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  
  public chartColors = [
    {
      backgroundColor: 'rgba(0, 153, 153, .5)',
      borderColor: 'rgb(0, 153, 153)',
      pointBackgroundColor: 'rgb(0, 153, 153)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(127, 193, 240, .8)'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
