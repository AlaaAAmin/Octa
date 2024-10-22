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
import { WishlistComponent } from './wishlist/wishlist.component';
import { FinishedCoursesComponent } from './finished-courses/finished-courses.component';
import { CertificateCanvasComponent } from './certificate-canvas/certificate-canvas.component';


@NgModule({
  declarations: [ProfileComponent, InformationComponent, CoursesComponent, CertificatesComponent, CourseCardComponent, WishlistComponent, FinishedCoursesComponent, CertificateCanvasComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class UserProfileModule { }
