import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseInsightRoutingModule } from './course-insight-routing.module';
import { CourseInsightComponent } from './course-insight.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [CourseInsightComponent],
  imports: [
    CommonModule,
    CourseInsightRoutingModule,
    MaterialModule
  ]
})
export class CourseInsightModule { }
