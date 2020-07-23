import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.auth.loginForStudent({ email, password }).then((token: any) => {
      // show notification
      this.auth.UserToken = token
      // redirect to profile page
      this.router.navigate([`user`,`profile`])
    })
  }

}
