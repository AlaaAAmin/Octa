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
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    StudentRegistrationComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    UserProfileModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
