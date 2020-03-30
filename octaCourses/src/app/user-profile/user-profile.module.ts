import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { InformationComponent } from './information/information.component';
import { CoursesComponent } from './courses/courses.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, InformationComponent, CoursesComponent, CertificatesComponent, CourseCardComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UserProfileModule { }
