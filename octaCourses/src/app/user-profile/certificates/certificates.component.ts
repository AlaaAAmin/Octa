import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  // the array below is just for testing
  cDescription='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore odio repellat porro quaerat saepe reiciendis voluptate! Accusamus vitae ducimus'
  finishedCourses= [
    {name: 'IT', description: this.cDescription, date: '2020/6/27', id: 1234},
    {name: 'IOT', description: this.cDescription, date: '2020/6/27', id: 4567},
    {name: 'Angular', description: this.cDescription, date: '2020/6/27', id: 4565}
  ];

  constructor() { }

  ngOnInit(): void{
  }



}
