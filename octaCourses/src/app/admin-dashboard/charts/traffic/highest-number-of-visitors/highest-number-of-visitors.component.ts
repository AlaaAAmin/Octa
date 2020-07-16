import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highest-number-of-visitors',
  templateUrl: './highest-number-of-visitors.component.html',
  styleUrls: ['./highest-number-of-visitors.component.css']
})
export class HighestNumberOfVisitorsComponent implements OnInit {

  // line chart bottom labels
  public lineChartLabels = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // line chart type
  public lineChartType = 'line';
  
  // line chart legend
  public lineChartLegend = true;
  
  // line chart data set
  public lineChartData = [
    {
      data: [15, 80, 100, 350, 120, 100, 500],
      label: 'Highest number of daily active users',
      steppedLine: 'middle'
    }
  ]

  //line chart options
  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
