import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserProfileModule } from './user-profile/user-profile.module';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { StudentRegistrationComponent } from './registeration/student-registration/student-registration.component';
import { CourseProviderRegisterationComponent } from './registeration/course-provider-registeration/course-provider-registeration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IntercepterService } from './services/authentication/intercepter.service';
import { SocketService } from './services/socket.service';
// import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io'
// const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}}
import { CategorySearchResultComponent } from './category-search-result/category-search-result.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    StudentRegistrationComponent,
    CategoriesComponent,
    LoginComponent,
    CourseProviderRegisterationComponent,
    ForgotPasswordComponent,
    CategorySearchResultComponent,
    ContactUsFormComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserProfileModule,
    FormsModule,
    HttpClientModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
    SocketService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
