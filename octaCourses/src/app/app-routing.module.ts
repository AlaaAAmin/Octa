import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { UserProfileRoutingModule } from './user-profile/user-profile-routing.module';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: StudentRegistrationComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    UserProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
