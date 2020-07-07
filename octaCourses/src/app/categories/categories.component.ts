import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  link: string = "/categories/11"
  categories: any[] = [
    {
      name: 'art',
      path: '/categories/art'
    },
    {
      name: 'design',
      path: '/categories/design'
    },
    {
      name: 'electronics',
      path: '/categories/electronics'
    },
    {
      name: 'engineering',
      path: '/categories/engineering'
    },
    {
      name: 'maths',
      path: '/categories/maths'
    },
    {
      name: 'medicine',
      path: '/categories/medicine'
    },
    {
      name: 'music',
      path: '/categories/music'
    },
    {
      name: 'physics',
      path: '/categories/physics'
    },
    {
      name: 'business',
      path: '/categories/business'
    },
    {
      name: 'communication',
      path: '/categories/communication'
    },
    {
      name: 'biology',
      path: '/categories/biology'
    },
    {
      name: 'computer science',
      path: '/categories/computer science'
    },
    {
      name: 'science',
      path: '/categories/science'
    },
    {
      name: 'architecture',
      path: '/categories/architecture'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
