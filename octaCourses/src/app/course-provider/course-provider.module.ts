import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseProviderRoutingModule } from './course-provider-routing.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    CourseProviderRoutingModule
  ]
})
export class CourseProviderModule { }
