import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-publishing',
  templateUrl: './course-publishing.component.html',
  styleUrls: ['./course-publishing.component.css']
})
export class CoursePublishingComponent implements OnInit {

  // selectedValue represents the choosen category name
  selectedValue: string;

  // start of the categories array
  // note that i don't know if we need an id or not but i put it anyway
  // i think the id should equal to the id of the category in the database
  categories: any[] = [
    {
      name: "art",
      id: 1
    },
    {
      name: "design",
      id: 2
    },
    {
      name: "electronics",
      id: 3
    },
    {
      name: "engineering",
      id: 4
    },
    {
      name: "maths",
      id: 5
    },
    {
      name: "medicine",
      id: 6
    },
    {
      name: "music",
      id: 7
    },
    {
      name: "physics",
      id: 8
    },
    {
      name: "business",
      id: 9
    },
    {
      name: "communuication",
      id: 10
    },
    {
      name: "biology",
      id: 11
    },
    {
      name: "computer science",
      id: 12
    },
    {
      name: "science",
      id: 13
    },
    {
      name: "architecture",
      id: 14
    }
  ]
  // end of the categories array


  constructor() { }

  ngOnInit(): void {
  }

}
