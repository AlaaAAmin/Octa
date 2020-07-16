import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseInsightComponent } from './course-insight.component';

const routes: Routes = [{ path: '', component: CourseInsightComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseInsightRoutingModule { }
