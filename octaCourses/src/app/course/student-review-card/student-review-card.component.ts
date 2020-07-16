import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-review-card',
  templateUrl: './student-review-card.component.html',
  styleUrls: ['./student-review-card.component.css']
})
export class StudentReviewCardComponent implements OnInit {

  // this reviews array is just for testing
  reviews: any[] = [
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "james",
      date: '22/6/2020',
      rate: 4.1,
      review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    },
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "ian",
      date: '22/6/2020',
      rate: 3.0,
      review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
