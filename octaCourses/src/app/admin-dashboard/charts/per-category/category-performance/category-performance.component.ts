import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-performance',
  templateUrl: './category-performance.component.html',
  styleUrls: ['./category-performance.component.css']
})
export class CategoryPerformanceComponent implements OnInit {

  // barCharLabels represents courses categories
  public barCharLabels = ['architecture', 'art', 'biology', 'business', 'communication', 'computer science',
                'design', 'electronics', 'engineering', 'maths', 'medicine', 'music', 'physics', 'science'];

  // barCharData represents the data set and it's label
  /* data sets combined from the number of courses providers that have courses from each category, 
  number of courses in each category and the number of students interested in each category
  so we can estimate which category needs attention to or the performance of each one
  */
  public barCharData = [
    //courses providers number in each category
    {
    data: [50, 73, 20, 150, 200, 250, 220, 57, 15, 100, 30, 15, 88, 17, 33],
    label: "courses' providers No.",
    maxBarThickness: 22
  },
  // number of courses in each category
    {
    data: [50, 200, 30, 300, 400, 300, 230, 75, 16, 100, 43, 27, 88, 17, 33],
    label: 'Courses No.',
    maxBarThickness: 22
  },
  // number of students interested in each category
    {
    data: [30, 300, 20, 1000, 1200, 300, 220, 57, 750, 100, 30, 15, 88, 17, 33],
    label: "Students' interested in this category",
    maxBarThickness: 22
  }

]

  // bar char type
  public barCharType = 'horizontalBar';

  //bar char options
  public barCharOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  }

  // bar char legend
  public barCharLegend = true;


  constructor() { }

  ngOnInit(): void {
  }

}
