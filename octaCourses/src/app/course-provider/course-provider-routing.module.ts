import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { InformationComponent } from './information/information.component';
import { BillingComponent } from './billing/billing.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { 
    path: 'profile', component: ProfileComponent, children: [
      { path: 'overview', component: InformationComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseProviderRoutingModule { }
