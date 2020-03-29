import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  register(data) {
    this.user.registerUser(data)
    .subscribe(res => console.log(res))
  }

}
