import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './information/information.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';


const userProfileRoutes: Routes = [
  {
    path: 'user/profile', component: ProfileComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'information' },
      { path: 'personal%20information', component: InformationComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'certificates', component: CertificatesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userProfileRoutes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
