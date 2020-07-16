import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial-statistics',
  templateUrl: './financial-statistics.component.html',
  styleUrls: ['./financial-statistics.component.css']
})
export class FinancialStatisticsComponent implements OnInit {

  // line chart bottom labels
  public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                            'September', 'October', 'November', 'December'];
  
  // line chart type
  public lineChartType = 'line';
  
  // line chart legend
  public lineChartLegend = true;
  

  /* for the purpose of calculating the ROI per month we need to split the linChartData data into 3
  the monthly revenue, monthly running cost and monthly net profit*/

  // monthly revenue data
  monthlyRevenue: any[] = [
    {
      data: [10000, 17000, 12000, 57000, 20000, 30000, 32000, 11000, 40000, 50000, 80000, 60000],
      label: 'Monthly revenue'
    }
  ]

  //monthly running cost
  monthlyRunningCost: any[] = [
    {
      data: [5000, 5000, 6000, 10000, 12000, 12000, 10000, 6000, 12000, 30000, 30000, 20000],
      label: 'Monthly running cost'
    }
  ]

  //monthly net revenue
  monthlyNetRevenue: any[] = [
    {
      data: [5000, 12000, 6000, 47000, 8000, 18000, 22000, 5000, 28000, 20000, 50000, 40000],
      label: 'Monthly net revenue'
    }
  ]

  // line chart data set
  public lineChartData = this.monthlyRevenue.concat(this.monthlyRunningCost, this.monthlyNetRevenue);


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


  fn = (arr1, arr2) => {
    let length = arr1.length | arr2.length
    let resArr = []
    for (let i = 0; i < length; i++) {
        let l = arr1[i].data.length | arr2[i].data.length
        resArr.push({data: []})
        for (let j = 0; j < l; j++) {
            resArr[i].data.push((arr1[i].data[j] / arr2[i].data[j]) * 100)  
        }
    }
    return resArr
}

public ROILineChartData = this.fn(this.monthlyNetRevenue, this.monthlyRunningCost)


  constructor() { }

  ngOnInit(): void {
    console.log(typeof(this.ROILineChartData))
  }

}
