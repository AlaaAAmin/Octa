import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inquiries-review',
  templateUrl: './inquiries-review.component.html',
  styleUrls: ['./inquiries-review.component.css']
})
export class InquiriesReviewComponent implements OnInit {

  // the next inquiries array is just for testing and should be removed after the page is working
  inquiries: any[] = [
    {
      personName: 'Dave',
      message: 'this is my meassage to you i am writing bla bla bla to tell you bla bla bla',
      email: 'example1@example.com'
    },
    {
      personName: 'Mohamed',
      message: 'this is my meassage to you i am writing bla bla bla to tell you bla bla bla',
      email: 'example2@example.com'
    },
    {
      personName: 'MKFHD',
      message: 'this is my meassage to you i am writing bla bla bla to tell you bla bla bla',
      email: 'example3@example.com'
    },
    {
      personName: 'Linus',
      message: 'this is my meassage to you i am writing bla bla bla to tell you bla bla bla',
      email: 'example4@example.com'
    },
    {
      personName: 'Ahmed',
      message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Rutrum quisque non tellus orci ac auctor augue. 
      Nisl vel pretium lectus quam id leo in vitae turpis.'`,
      email: 'example5@example.com'
    }
  ]

  // endInquiry is used to delete the inquiry from the database after replying by email
  // this is here for simulation not the actual function
  endInquiry(selectedEmail){
    for (var i=0; i<this.inquiries.length; i++) {
      if (selectedEmail == this.inquiries[i].email) {
          this.inquiries.splice(i, 1);
      }
  }
  }
  // end of function
  
  constructor() { }

  ngOnInit(): void {
  }

}
