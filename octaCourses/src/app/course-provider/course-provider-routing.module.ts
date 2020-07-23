import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { InformationComponent } from './information/information.component';
import { BillingComponent } from './billing/billing.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsInfoComponent } from './statistics-info/statistics-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile' },
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: 'overview', component: InformationComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'statistics/:id', component: StatisticsInfoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseProviderRoutingModule { }
