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

  /* selectedValue represents the choosen category name or id or whatever that suits the purpose best
  as the interests of the student */
  // it supports two way binding so it should containe the previously selected categories ( if it was choosen before )
  selectedValue: string[] = ['art'];

  // start of the categories array
  // note that i don't know if we need an id or not but i put it anyway
  // i think the id should equal to the id of the category in the database
  categories: any[] = [
    { name: "art" },
    { name: "design" },
    { name: "electronics" },
    { name: "engineering" },
    { name: "maths" },
    { name: "medicine" },
    { name: "music" },
    { name: "physics" },
    { name: "business" },
    { name: "communuication" },
    { name: "biology" },
    { name: "computer science" },
    { name: "science" },
    { name: "architecture" }
  ]
  // end of the categories array

  constructor() { }

  ngOnInit(): void {
  }

  // the below functions used to display and hide the editing forms for the input fields

  editName: boolean = true;
  editEmail: boolean = true;
  editInterests: boolean = true;
  editPhone: boolean = true;
  editFacebookAccount: boolean = true;
  editBirthdate: boolean = true;
  changePassword: boolean = true;

  //name section
  //name edit shows the input field
  nameEdit() {
    this.editName = false;
  }
  // submitName should submit the name to the database then hides the input fields
  submitName() {
    this.editName = true;
  }

  //email section
  emailEdit() {
    this.editEmail = false;
  }
  // submitEmail should submit the name to the database then hides the input fields
  submitEmail() {
    this.editEmail = true;
  }

  // start of interests section
  /* interestsEdit() is used to change the variable editInterests that controls hiding and showing
  the interests drop down */
  interestEdit() {
    this.editInterests = !this.editInterests;
  }

  submitInterests() {
    // this function should submit the interests to the DB

    // this function should submit the interests to the DB
    // then hides the interests drop down
    this.editInterests = !this.editInterests;
  }
  // end of interests section

  //phone section
  phoneEdit() {
    this.editPhone = false;
  }
  // submitPhone should submit the name to the database then hides the input fields
  submitPhone() {
    this.editPhone = true;
  }

  //facebook account section
  facebookAccountEdit() {
    this.editFacebookAccount = false;
  }
  // submitFacebookAccount should submit the name to the database then hides the input fields
  submitFacebookAccount() {
    this.editFacebookAccount = true;
  }

  //birthdate section
  birthdateEdit() {
    this.editBirthdate = false;
  }
  // submitBirthdate should submit the name to the database then hides the input fields
  submitBirthdate() {
    this.editBirthdate = true;
  }

  //password section
  passwordEdit() {
    this.changePassword = false;
  }
  // submitPassword should submit the name to the database then hides the input fields
  submitPassword() {
    this.changePassword = true;
  }
}
