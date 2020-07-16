import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-question-card',
  templateUrl: './course-question-card.component.html',
  styleUrls: ['./course-question-card.component.css']
})
export class CourseQuestionCardComponent implements OnInit {

  displayAnswerForm: boolean = true;

  // this reviews array is just for testing
  questions: any[] = [
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "james",
      date: '22/6/2020',
      question: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    },
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "james",
      date: '22/6/2020',
      question: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    }

  ]

  showAsnwer(){
    this.displayAnswerForm = !this.displayAnswerForm;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
