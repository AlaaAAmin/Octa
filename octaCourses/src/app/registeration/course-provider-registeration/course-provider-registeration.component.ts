import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-provider-registeration',
  templateUrl: './course-provider-registeration.component.html',
  styleUrls: ['./course-provider-registeration.component.css']
})
export class CourseProviderRegisterationComponent implements OnInit {

  // hiddenLoginForm is just a variable used to show and hide the loginForm
  hiddenLoginForm: boolean = true;

  showLogin_hideRegisterationForm(){
    this.hiddenLoginForm = !this.hiddenLoginForm;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
