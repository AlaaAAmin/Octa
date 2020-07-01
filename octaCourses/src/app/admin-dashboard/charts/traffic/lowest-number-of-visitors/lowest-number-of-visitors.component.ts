import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lowest-number-of-visitors',
  templateUrl: './lowest-number-of-visitors.component.html',
  styleUrls: ['./lowest-number-of-visitors.component.css']
})
export class LowestNumberOfVisitorsComponent implements OnInit {

  // line chart bottom labels
  public lineChartLabels = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // line chart type
  public lineChartType = 'line';
  
  // line chart legend
  public lineChartLegend = true;
  
  // line chart data set
  public lineChartData = [
    {
      data: [5, 20, 20, 50, 50, 10, 100],
      label: 'Lowest number of daily active users',
      steppedLine: 'middle'
    }
  ]

  //line chart options
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  colors = [
    {
      backgroundColor: 'rgba(127, 193, 240, .5)',
      borderColor: 'rgb(103, 58, 183)',
      pointBackgroundColor: 'rgb(103, 58, 183)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
    },
    // ...colors for additional data sets
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
