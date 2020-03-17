import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  exports: [
    MatIconModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class MaterialModule { }
