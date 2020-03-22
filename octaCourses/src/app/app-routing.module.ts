import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { UserProfileRoutingModule } from './user-profile/user-profile-routing.module';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    UserProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
