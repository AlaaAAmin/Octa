import { Component, OnInit } from '@angular/core';
import { StatisticsComponent } from '../course-provider/statistics/statistics.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  //test
    links: any[] = [
      {
        title: "Platform statistics",
        path: "/admin-dashboard/platform-statistics"
      },
      {
        title: "Review courses",
        path: "/admin-dashboard/courses-review"
      },
      {
        title: "EULA violations",
        path: "/admin-dashboard/eula-violations"
      },
      {
        title: "Students review",
        path: "/admin-dashboard/students-review"
      },
      {
        title: "Inquiries review",
        path: "/admin-dashboard/inquiries-review"
      },
    ]
  //test

  // start of admin components links
  path1: string = "/admin-dashboard/platform-statistics";
  path2: string = "/admin-dashboard/platform-statistics";
  path3: string = "/admin-dashboard/platform-statistics";
  path4: string = "/admin-dashboard/platform-statistics";
  path5: string = "/admin-dashboard/platform-statistics";
    // end of admin components links
  statStatus: boolean = false;
  courseRevStatus: boolean = false;
  eulaStatus: boolean = false;
  stdRevStatus: boolean = false;
  inquiriesStatus: boolean = false;

  stats(){
    this.statStatus = true;
    this.courseRevStatus = false;
    this.eulaStatus = false;
    this.stdRevStatus = false;
    this.inquiriesStatus = false;
  }

  courseRev(){
    this.statStatus = false;
    this.courseRevStatus = true;
    this.eulaStatus = false;
    this.stdRevStatus = false;
    this.inquiriesStatus = false;
  }

  eula(){
    this.statStatus = false;
    this.courseRevStatus = false;
    this.eulaStatus = true;
    this.stdRevStatus = false;
    this.inquiriesStatus = false;
  }

  stdRev(){
    this.statStatus = false;
    this.courseRevStatus = false;
    this.eulaStatus = false;
    this.stdRevStatus = true;
    this.inquiriesStatus = false;
  }

  inquiries(){
    this.statStatus = false;
    this.courseRevStatus = false;
    this.eulaStatus = false;
    this.stdRevStatus = false;
    this.inquiriesStatus = true;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
