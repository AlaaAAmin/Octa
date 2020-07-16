import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-review',
  templateUrl: './courses-review.component.html',
  styleUrls: ['./courses-review.component.css']
})
export class CoursesReviewComponent implements OnInit {

  // the array below is just for testing
  courses= [
    {name: 'IT', provider: 'Dave', submissionDate: '2020/6/27', id: 1234},
    {name: 'Node.js', provider: 'jane', submissionDate: '2020/6/27', id: 4567},
    {name: 'Embedded systems', provider: 'mosh', submissionDate: '2020/6/27', id: 4565}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
