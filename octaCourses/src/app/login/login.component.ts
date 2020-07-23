import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.auth.loginForStudent({ email, password }).then((token: any) => {
      // show notification
      this.toastService.success('Successfully logged in')

      this.auth.UserToken = token
      // redirect to profile page
      this.router.navigate([`user`,`profile`])
    })
    .catch(err => {
      this.toastService.error(err.message)
    })
  }

}
