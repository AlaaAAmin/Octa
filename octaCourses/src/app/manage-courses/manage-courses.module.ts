import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageCoursesRoutingModule } from './manage-courses-routing.module';
import { ManageCoursesComponent } from './manage-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';


@NgModule({
  declarations: [ManageCoursesComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    ManageCoursesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ManageCoursesModule { }
