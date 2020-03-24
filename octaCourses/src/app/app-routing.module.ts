import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { UserProfileRoutingModule } from './user-profile/user-profile-routing.module';
import { StudentRegistrationComponent } from './registeration/student-registration/student-registration.component';
import { LoginComponent } from './login/login.component';
import { CourseProviderRegisterationComponent } from './registeration/course-provider-registeration/course-provider-registeration.component';


const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'studentregisteration', component: StudentRegistrationComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CoursesComponent },
  { path: 'courseproviderregisteration', component: CourseProviderRegisterationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    UserProfileRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
