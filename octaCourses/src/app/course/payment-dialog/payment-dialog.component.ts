import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeElementsOptions, StripeCardElementOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup
  constructor(private fb: FormBuilder, private Stripe: StripeService, private router: Router, private CService: CourseService) {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }


  // for creating token to init stripe purchase transaction
  initPurchase() {
    // this.Stripe.createToken({})
    const name = this.stripeTest.get('name').value;
    this.Stripe
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);

          // token created for client to make purchase
          // submit form to backend containing price and token and some info of product

          var token = result.token.id

          let courseId = this.router.url.split('/')[2]
          console.log('h')
          this.CService.purchaseCourse(courseId, token)
            .then(console.log)
            .catch(console.log)
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  stripeResponseHandler(status, response) {
    if (response.error) {
      // handle error response.error.message
      // re enable submission
      console.log('err')
      return
    } else {
      // this fired when success charge happened for user
      // fire success
      console.log('success')
    }

  }

  cancel() {


  }

}
