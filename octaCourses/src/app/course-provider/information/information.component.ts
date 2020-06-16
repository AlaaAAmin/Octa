import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editName:boolean = true;
  editEmail:boolean = true;
  editPhone:boolean = true;
  editFacebookAccount:boolean = true;
  editTwitterAccount:boolean = true;
  editBirthdate:boolean = true;
  changePassword:boolean = true;

  //name section
  //name edit shows the input field
  nameEdit(){
    this.editName = false;
  }
  // submitName should submit the name to the database then hides the input fields
  submitName(){
    this.editName = true;
  }

  //email section
  emailEdit(){
    this.editEmail = false;
  }
  // submitEmail should submit the name to the database then hides the input fields
  submitEmail(){
    this.editEmail = true;
  }

  //phone section
  phoneEdit(){
    this.editPhone = false;
  }
  // submitPhone should submit the name to the database then hides the input fields
  submitPhone(){
    this.editPhone = true;
  }

  //facebook account section
  facebookAccountEdit(){
    this.editFacebookAccount = false;
  }
  // submitFacebookAccount should submit the name to the database then hides the input fields
  submitFacebookAccount(){
    this.editFacebookAccount = true;
  }

  //twitter account section
  twitterAccountEdit(){
    this.editTwitterAccount = false;
  }
  // submitTwitterAccount should submit the name to the database then hides the input fields
  submitTwitterAccount(){
    this.editTwitterAccount = true;
  }

  //birthdate section
  birthdateEdit(){
    this.editBirthdate = false;
  }
  // submitBirthdate should submit the name to the database then hides the input fields
  submitBirthdate(){
    this.editBirthdate = true;
  }

  //password section
  passwordEdit(){
    this.changePassword = false;
  }
  // submitPassword should submit the name to the database then hides the input fields
  submitPassword(){
    this.changePassword = true;
  }

}
