import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  constructor(private user: UserService) { }

  /* the istructor money threshold value is the value that his earnings must exceed in order to
  be able to get paid*/
  moneyThreshold: number = 5000;

  // the instructor earnings from our platform
  earnings: number = 4000;
  /*paymentHolds variable should represent the holds that the course provider must pay first
  in order to be able to receive his earnings then
  it could represent the money of the students that requested a refund for one of his courses*/
  paymentHolds: number = 0;

  /*destination variable indicates the destination page based on the paymentHolds variable
  -- if there is a paymentHolds then the course provider should be redirected to the page
  where he will pay us the money

  -- if the paymentHolds = 0 then he will be transefered to the page where he can get paid his earnings
  if his earnings reached the money threshold of course*/
  destination: string;

  // action shows whether the instructor can get paid or resolve hiis payment holds
  action: String;

  /* actionRequired is the function that controls the button (aka link) that redirects the instructor
  to get paid or resolve his payments holds*/
  actionRequired(){
    if (this.paymentHolds == 0) {
      this.action = "Recieve payment";
      /* the destination link will be the recievePayment component but the router link in the below line
       is for testing only*/
      this.destination = "/course-provider/profile/statistics"
    } else {
      this.action = "Resolve payment holds";
      /* the destination link will be the recievePayment component but the router link in the below line
       is for testing only*/
      this.destination = "/course-provider/profile/overview"
    }
  }

  /* editThreshold() shows the threshold update form by making the thresholdEdit variable false */
  thresholdEdit: boolean = true;
  editThreshold(){
    this.thresholdEdit = false;
  }

  /* updateThreshold() should update the moneyThreshold variable to its new value
  and then hides the threshold update form by making the thresholdEdit variable true */
  updateThreshold(){
    this.thresholdEdit = true;
  }

  connectToStripe() {
    let data = { email: 'testEmail21@gmail.com' }
    this.user.connectProviderToStripe(data)
  }
  ngOnInit(): void {
    this.actionRequired();
  }

}
