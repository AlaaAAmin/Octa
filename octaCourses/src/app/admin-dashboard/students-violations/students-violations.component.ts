import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-violations',
  templateUrl: './students-violations.component.html',
  styleUrls: ['./students-violations.component.css']
})
export class StudentsViolationsComponent implements OnInit {

  // start of students data array
  students: any[] = [
    {
      name: "Ahmed",
      email: "lorem@domain.com",
      joiningDate: 'October 30, 2018'
    },
    {
      name: "Islam",
      email: "lorem@domain.com",
      joiningDate: 'june 1, 2020'
    },
    {
      name: "Dan",
      email: "lorem@domain.com",
      joiningDate: 'january 10, 2020'
    },
    {
      name: "James",
      email: "lorem@domain.com",
      joiningDate: 'april 17, 2020'
    }
  ]
  //end of students data array

  constructor() { }

  ngOnInit(): void {
  }

}
