import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageCoursesRoutingModule } from './manage-courses-routing.module';
import { ManageCoursesComponent } from './manage-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { LectureFormComponent } from './lecture-form/lecture-form.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { CloseCourseEnrollmentComponent } from './close-course-enrollment/close-course-enrollment.component';
import { FinalCourseTestComponent } from './final-course-test/final-course-test.component';


@NgModule({
  declarations: [ManageCoursesComponent, CreateCourseComponent, LectureFormComponent, QuizFormComponent, UpdateCourseComponent, CloseCourseEnrollmentComponent, FinalCourseTestComponent],
  imports: [
    CommonModule,
    ManageCoursesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ManageCoursesModule { }
