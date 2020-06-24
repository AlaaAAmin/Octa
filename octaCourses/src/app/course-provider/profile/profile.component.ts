import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  navLinks: any[];
  constructor() { 

    this.navLinks = [
      {
        label: 'Overview',
        path: '/course-provider/profile/overview',
        index: 0
      }, {
        label: 'Billing',
        path: '/course-provider/profile/billing',
        index: 1
      }, {
        label: 'Statistics',
        path: '/course-provider/profile/statistics',
        index: 1
      }
      
    ];
   }

  ngOnInit(): void {
  }

}
