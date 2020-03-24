import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  items = [1,2,3,4,5]
  constructor() { }

  ngOnInit(): void {
  }

}
