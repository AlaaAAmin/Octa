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
        label: 'Personal Information',
        path: '/user/profile/personal%20information',
        index: 0
      }, {
        label: 'Courses',
        path: '/user/profile/courses',
        index: 1
      }, {
        label: 'Certificates',
        path: '/user/profile/certificates',
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
