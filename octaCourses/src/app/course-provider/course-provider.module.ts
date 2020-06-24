import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseProviderRoutingModule } from './course-provider-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { InformationComponent } from './information/information.component';
import { FormsModule } from '@angular/forms';
import { BillingComponent } from './billing/billing.component';
import { StatisticsComponent } from './statistics/statistics.component';
@NgModule({
  declarations: [ProfileComponent, InformationComponent, BillingComponent, StatisticsComponent],
  imports: [
    CommonModule,
    CourseProviderRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CourseProviderModule { }
