import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentRegistrationComponent } from './registeration/student-registration/student-registration.component';
import { LoginComponent } from './login/login.component';
import { CourseProviderRegisterationComponent } from './registeration/course-provider-registeration/course-provider-registeration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  { path: 'course-provider', loadChildren: () => import('./course-provider/course-provider.module').then(m => m.CourseProviderModule) },
  { path: 'student', loadChildren: ()=> import('./user-profile/user-profile.module').then(m => m.UserProfileModule)},
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: StudentRegistrationComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/:id', component: CoursesComponent },
  { path: 'courseproviderregisteration', component: CourseProviderRegisterationComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'manage-courses', loadChildren: () => import('./manage-courses/manage-courses.module').then(m => m.ManageCoursesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
