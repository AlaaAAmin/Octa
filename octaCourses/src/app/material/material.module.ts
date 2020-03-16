import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  exports: [
    MatIconModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
