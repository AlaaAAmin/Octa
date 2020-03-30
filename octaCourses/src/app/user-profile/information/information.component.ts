import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  user = {
    name: 'Alaa A Amin',
    email: 'alaaamin@gmail.com'
  }
  constructor() { }

  ngOnInit(): void {
  }

  // the below functions used to display and hide the editing forms for the input fields

  editName:boolean = true;
  editEmail:boolean = true;
  editPhone:boolean = true;
  editFacebookAccount:boolean = true;
  editBirthdate:boolean = true;
  changePassword:boolean = true;

  //name section
  //name edit shows the input field
  nameEdit(){
    this.editName = false;
  }
  // submit name should submit the name to the database then hides the input fields
  submitName(){
    this.editName = true;
  }

  //email section
  emailEdit(){
    this.editEmail = false;
  }
  // submit name should submit the name to the database then hides the input fields
  submitEmail(){
    this.editEmail = true;
  }

  //phone section
  phoneEdit(){
    this.editPhone = false;
  }
  // submit name should submit the name to the database then hides the input fields
  submitPhone(){
    this.editPhone = true;
  }

  //facebook account section
  facebookAccountEdit(){
    this.editFacebookAccount = false;
  }
  // submit name should submit the name to the database then hides the input fields
  submitFacebookAccount(){
    this.editFacebookAccount = true;
  }

  //birthdate section
  birthdateEdit(){
    this.editBirthdate = false;
  }
  // submit name should submit the name to the database then hides the input fields
  submitBirthdate(){
    this.editBirthdate = true;
  }

  //password section
  passwordEdit(){
    this.changePassword = false;
  }
  // submit name should submit the name to the database then hides the input fields
  submitPassword(){
    this.changePassword = true;
  }
}
