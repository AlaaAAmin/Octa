import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseProviderRoutingModule } from './course-provider-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { InformationComponent } from './information/information.component';
import { FormsModule } from '@angular/forms';
import { BillingComponent } from './billing/billing.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { StatisticsInfoComponent } from './statistics-info/statistics-info.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ProfileComponent, InformationComponent, BillingComponent, StatisticsComponent, CreateCourseComponent, StatisticsInfoComponent],
  imports: [
    CommonModule,
    CourseProviderRoutingModule,
    MaterialModule,
    FormsModule,
    ChartsModule
  ]
})
export class CourseProviderModule { }
