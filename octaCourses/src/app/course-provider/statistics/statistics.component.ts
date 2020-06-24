import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  courses= [
    {name: 'IT', id: 1234},
    {name: 'IOT', id: 4567},
    {name: 'Network', id: 5678}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
