import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { MaterialModule } from '../shared/material/material.module';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { CourseProviderCardComponent } from './course-provider-card/course-provider-card.component';
import { StudentReviewCardComponent } from './student-review-card/student-review-card.component';
import { CourseProviderReviewCardComponent } from './course-provider-review-card/course-provider-review-card.component';
import { CourseReviewFormComponent } from './course-review-form/course-review-form.component';
import { CourseProviderReviewFormComponent } from './course-provider-review-form/course-provider-review-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CourseComponent, CourseProviderCardComponent, StudentReviewCardComponent, CourseProviderReviewCardComponent, CourseReviewFormComponent, CourseProviderReviewFormComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    Ng2PageScrollModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
