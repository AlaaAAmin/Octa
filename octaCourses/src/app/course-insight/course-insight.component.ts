import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-insight',
  templateUrl: './course-insight.component.html',
  styleUrls: ['./course-insight.component.css']
})
export class CourseInsightComponent implements OnInit {

  // the next modules array is just for testing and should be removed after the page is working
  modules: any[] = [
    {
      moduleName: 'module 1',
      description: 'this is the first module description here you will learn every thing new that you didn"t knoe before',
      lectures: [
        {
          lecName: 'lecture 1',
          duration: '5:30'
        },
        {
          lecName: 'lecture 2',
          duration: '4:00'
        },
        {
          lecName: 'lecture 3',
          duration: '3:01'
        }
      ]
    },
    {
      moduleName: 'module 3',
      description: 'this is the third module description here you will learn every thing new that you didn"t knoe before',
      lectures: [
        {
          lecName: 'lecture 1',
          duration: '5:30'
        },
        {
          lecName: 'lecture 2',
          duration: '4:00'
        },
        {
          lecName: 'lecture 3',
          duration: '3:01'
        }
      ]
    },
    {
      moduleName: 'module 2',
      description: 'this is the second module description here you will learn every thing new that you didn"t knoe before',
      lectures: [
        {
          lecName: 'lecture 1',
          duration: '5:30'
        },
        {
          lecName: 'lecture 2',
          duration: '4:00'
        },
        {
          lecName: 'lecture 3',
          duration: '3:01'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
