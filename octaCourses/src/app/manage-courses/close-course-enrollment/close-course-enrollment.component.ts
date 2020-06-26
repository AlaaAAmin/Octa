import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-course-enrollment',
  templateUrl: './close-course-enrollment.component.html',
  styleUrls: ['./close-course-enrollment.component.css']
})
export class CloseCourseEnrollmentComponent implements OnInit {

  // the array below is just for testing
  cDescription='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore odio repellat porro quaerat saepe reiciendis voluptate! Accusamus vitae ducimus'
  courses= [
    {name: 'IT', description: this.cDescription, date: '2020/6/27', id: 1234},
    {name: 'IOT', description: this.cDescription, date: '2020/6/27', id: 4567},
    {name: 'Angular', description: this.cDescription, date: '2020/6/27', id: 4565},
    {name: 'Angular', description: this.cDescription, date: '2020/6/27', id: 4565},
    {name: 'Network', description: this.cDescription, date: '2020/6/27', id: 5678}
  ];

  closedEnrollment: boolean= false;

  closeEnrollment(){
    this.closedEnrollment = !this.closedEnrollment;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
