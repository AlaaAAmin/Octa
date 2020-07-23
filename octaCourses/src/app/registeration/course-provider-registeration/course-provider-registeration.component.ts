import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private auth: AuthService, private toastService: ToastrService) { }

  ngOnInit(): void {
  }

  register(val: any) {
    this.auth.registerForProvider({ name: val.name, email: val.email, password: val.password, phone: val.phone })
      .then(() => {
        this.toastService.success('Provide registered')
      })
      .catch((err)=>{
        console.log(err)
        this.toastService.error(err.error.message)

      })
  }

}
