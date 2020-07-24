import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: '', component: ErrorComponent },
  { path: '404', component: Error404Component },
  { path: '403', component: Error403Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }

/* const routes: Routes = [
  { path: '', redirectTo: 'profile' },
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: 'overview', component: InformationComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'statistics/:id', component: StatisticsInfoComponent }
    ]
  }
]; */