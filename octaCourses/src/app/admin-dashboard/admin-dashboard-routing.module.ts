import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { EulaViolationsComponent } from './eula-violations/eula-violations.component';
import { InquiriesReviewComponent } from './inquiries-review/inquiries-review.component';
import { PlatformStatisticsComponent } from './platform-statistics/platform-statistics.component';
import { StudentsReviewComponent } from './students-review/students-review.component';
import { CoursesReviewComponent } from './courses-review/courses-review.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'AdminDashboardComponent' },
    {path: 'eula-violations', component: EulaViolationsComponent},
    {path: 'inquiries-review', component: InquiriesReviewComponent},
    {path: 'platform-statistics', component: PlatformStatisticsComponent},
    {path: 'courses-review', component: CoursesReviewComponent},
    {path: 'students-review', component: StudentsReviewComponent}
  ] }
];

/* const userProfileRoutes: Routes = [
  {
    path: 'user/profile', component: ProfileComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'information' },
      { path: 'overview', component: InformationComponent },
      { path: 'enrolledInCourses', component: CoursesComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'finishedCourses', component: FinishedCoursesComponent }
    ]
  }
]; */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
