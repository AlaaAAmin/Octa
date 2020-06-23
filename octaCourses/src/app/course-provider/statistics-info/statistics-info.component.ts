import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-info',
  templateUrl: './statistics-info.component.html',
  styleUrls: ['./statistics-info.component.css']
})
export class StatisticsInfoComponent implements OnInit {

  public pieChartLabels =  ['Q1', 'Q2', 'Q3', 'Q4'];
  public pieChartData = [120, 130, 180, 70]
  public pieChartType = 'pie';




  public doughnutChartLabels = ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'];
  public doughnutChartData = [120, 150, 180, 90, 45];
  public doughnutChartType = 'doughnut';



  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Students enrolled'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Students finished'},
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Students rated'},

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
