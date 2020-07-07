import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-search-result',
  templateUrl: './category-search-result.component.html',
  styleUrls: ['./category-search-result.component.css']
})
export class CategorySearchResultComponent implements OnInit {

  categories: string[] = ['IT', 'IOT','IT', 'IOT','IT', 'IOT','IT', 'IOT','IT', 'IOT','IT', 'IOT','IT', 'IOT','IT', 'IOT']

  constructor() { }

  ngOnInit(): void {
  }

}
