import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-answer-card',
  templateUrl: './course-answer-card.component.html',
  styleUrls: ['./course-answer-card.component.css']
})
export class CourseAnswerCardComponent implements OnInit {

  answer: any =
    {
    providerProfilePhotoSrc: "assets/img/person.jpg",
    courseProviderName: "MKBHD",
    date: '22/6/2020',
    answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
    neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
     Voluptatibus illum recusandae natus non ad commodi voluptatum!`,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
