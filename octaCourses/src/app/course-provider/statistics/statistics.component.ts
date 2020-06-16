import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  courses: string[] = ['IT', 'IOT','IT', 'IOT','IT'];

  constructor() { }

  ngOnInit(): void {
  }

}
