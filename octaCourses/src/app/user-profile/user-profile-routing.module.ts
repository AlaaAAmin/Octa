import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { FinishedCoursesComponent } from './finished-courses/finished-courses.component';
import { CertificateCanvasComponent } from './certificate-canvas/certificate-canvas.component';


const userProfileRoutes: Routes = [
  {
    path: 'user/profile', component: ProfileComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'information' },
      { path: 'overview', component: InformationComponent },
      { path: 'enrolledInCourses', component: CoursesComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'certificates/:id', component: CertificateCanvasComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'finishedCourses', component: FinishedCoursesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
