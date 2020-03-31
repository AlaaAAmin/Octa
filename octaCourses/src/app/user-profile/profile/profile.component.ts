import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  navLinks: any[];
  activeLinkIndex: number;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Overview',
        path: '/user/profile/overview',
        index: 0
      }, {
        label: 'Enrolled in',
        path: '/user/profile/enrolledInCourses',
        index: 1
      }, {
        label: 'Wishlist',
        path: '/user/profile/wishlist',
        index: 1
      }, {
        label: 'Certificates',
        path: '/user/profile/certificates',
        index: 1
      }, {
        label: 'Finished courses',
        path: '/user/profile/finishedCourses',
        index: 1
      }
      
    ];
    this.activeLinkIndex = -1
  }
  ngOnInit() : void{
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.path === this.router.url));
    });
  }

}
