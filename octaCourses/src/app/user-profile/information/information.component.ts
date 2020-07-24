import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  user;

  /* selectedValue represents the choosen category name or id or whatever that suits the purpose best
  as the interests of the student */
  // it supports two way binding so it should containe the previously selected categories ( if it was choosen before )
  selectedValue: string[] = [];

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

  constructor(private UService: UserService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.UService.getStudentInfo().then((user: any) => {
      this.user = user.data.user
      console.log(user)
    }).catch(err => {
      this.toastService.error(err.message)
    })
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
  submitName(val: string) {
    this.editName = true;
    this.UService.updateStudentInfo({ firstname: val.split(' ')[0], lastname: val.split(' ')[1] })
    .then(() => {
      this.toastService.success('Updated user name')
    })
    .catch(err => {
      this.toastService.error(err.message)
    })
  }

  //email section
  emailEdit() {
    this.editEmail = false;
  }
  // submitEmail should submit the name to the database then hides the input fields
  submitEmail(val) {
    this.editEmail = true;
    this.UService.updateStudentInfo({ email: val })
    .then(() => {
      this.toastService.success('Updated user email')
    })
    .catch(err => {
      this.toastService.error(err.message)
    })
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

    this.UService.updateStudentInfo({ interests: this.selectedValue })
      .then(() => {
        this.toastService.success('Updated user interests')
      })
      .catch(err => {
        this.toastService.error(err.message)
      })
  }
  // end of interests section

  //phone section
  phoneEdit() {
    this.editPhone = false;
  }
  // submitPhone should submit the name to the database then hides the input fields
  submitPhone(val) {
    this.editPhone = true;
    this.UService.updateStudentInfo({ phone: val })
    .then(() => {
      this.toastService.success('Updated user phone')
    })
    .catch(err => {
      this.toastService.error(err.message)
    })
  }

  //birthdate section
  birthdateEdit() {
    this.editBirthdate = false;
  }
  // submitBirthdate should submit the name to the database then hides the input fields
  submitBirthdate(val) {
    this.editBirthdate = true;
    this.UService.updateStudentInfo({ date_of_birth: val })
    .then(() => {
      this.toastService.success('Updated user date of birth')
    })
    .catch(err => {
      this.toastService.error(err.message)
    })
  }

  //password section
  passwordEdit() {
    this.changePassword = false;
  }
  // submitPassword should submit the name to the database then hides the input fields
  submitPassword(val) {
    this.changePassword = true;
    this.UService.updateStudentInfo({ password: val })
    .then(() => {
      this.toastService.success('Updated user password')
    })
    .catch(err => {
      this.toastService.error(err.message)
    })
  }
}
