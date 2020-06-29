import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { EulaViolationsComponent } from './eula-violations/eula-violations.component';
import { StudentsReviewComponent } from './students-review/students-review.component';
import { InquiriesReviewComponent } from './inquiries-review/inquiries-review.component';
import { PlatformStatisticsComponent } from './platform-statistics/platform-statistics.component';
import { CoursesReviewComponent } from './courses-review/courses-review.component';


@NgModule({
  declarations: [AdminDashboardComponent, EulaViolationsComponent, StudentsReviewComponent, InquiriesReviewComponent, PlatformStatisticsComponent, CoursesReviewComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
