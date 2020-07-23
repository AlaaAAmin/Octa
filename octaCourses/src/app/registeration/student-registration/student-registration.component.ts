import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(data) {
    if (data.name) {
      data.firstname = data.name.split(' ')[0]
      data.lastname = data.name.split(' ')[1]  
      delete data.name
    }
    this.auth.registerForStudent(data).then(()=> {
      // notification success

      // redirect to login page
      this.router.navigate(['/login'])
    }).catch(()=> {
      // notification failure

    })
  }

}
