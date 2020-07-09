import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-provider-review-card',
  templateUrl: './course-provider-review-card.component.html',
  styleUrls: ['./course-provider-review-card.component.css']
})
export class CourseProviderReviewCardComponent implements OnInit {

  // this reviews array is just for testing
  reviews: any[] = [
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "ahmed",
      date: '1/6/2020',
      rate: 4.1,
      review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    },
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "alaa",
      date: '2/6/2020',
      rate: 3.0,
      review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    },
    {
      profilePhotoSrc: "assets/img/student.jpg",
      studentName: "mostafa",
      date: '10/6/2020',
      rate: 4.5,
      review: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur impedit optio fugiat, 
      neque veritatis veniam itaque magnam sequi cum dignissimos corporis magni!
       Voluptatibus illum recusandae natus non ad commodi voluptatum!`
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
