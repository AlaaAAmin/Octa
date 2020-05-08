import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finished-courses',
  templateUrl: './finished-courses.component.html',
  styleUrls: ['./finished-courses.component.css']
})
export class FinishedCoursesComponent implements OnInit {

  categories: string[] = ['IT', 'IOT','IT', 'IOT','IT']
  constructor() { }

  ngOnInit(): void {
  }

}
