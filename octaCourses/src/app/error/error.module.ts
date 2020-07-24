import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { Error404Component } from './error404/error404.component';
import { Error403Component } from './error403/error403.component';


@NgModule({
  declarations: [ErrorComponent, Error404Component, Error403Component],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
