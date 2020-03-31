import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  exports: [
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule
  ]
})
export class MaterialModule { }
