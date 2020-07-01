import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { EulaViolationsComponent } from './eula-violations/eula-violations.component';
import { InquiriesReviewComponent } from './inquiries-review/inquiries-review.component';
import { PlatformStatisticsComponent } from './platform-statistics/platform-statistics.component';
import { CoursesReviewComponent } from './courses-review/courses-review.component';
import { StudentsViolationsComponent } from './students-violations/students-violations.component';
import { ChartsModule } from 'ng2-charts';
import { CategoryPerformanceComponent } from './charts/per-category/category-performance/category-performance.component';
import { AverageDailyActiveUsersComponent } from './charts/traffic/average-daily-active-users/average-daily-active-users.component';
import { HighestNumberOfVisitorsComponent } from './charts/traffic/highest-number-of-visitors/highest-number-of-visitors.component';
import { LowestNumberOfVisitorsComponent } from './charts/traffic/lowest-number-of-visitors/lowest-number-of-visitors.component';
import { FinancialStatisticsComponent } from './charts/financial-statistics/financial-statistics.component';


@NgModule({
  declarations: [AdminDashboardComponent, EulaViolationsComponent, InquiriesReviewComponent, PlatformStatisticsComponent, CoursesReviewComponent, StudentsViolationsComponent, CategoryPerformanceComponent, AverageDailyActiveUsersComponent, HighestNumberOfVisitorsComponent, LowestNumberOfVisitorsComponent, FinancialStatisticsComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ChartsModule
  ]
})
export class AdminDashboardModule { }
