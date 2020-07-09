import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-provider-review-form',
  templateUrl: './course-provider-review-form.component.html',
  styleUrls: ['./course-provider-review-form.component.css']
})
export class CourseProviderReviewFormComponent implements OnInit {

  constructor( private fb: FormBuilder ) { }

  // fb.group is a formBuilder function used to build a formGroup
  /* courseReviewForm is a form model representing the entire form values by containing
  the formControls that access the forms input fields' values */
  /* the second element in every form control is for validators
     note: if you want more that one validator then you will make it an array*/
     courseProviderReviewForm = this.fb.group({
      rate: [, [Validators.min(0), Validators.max(5)]],
      review: ['', [Validators.required, Validators.minLength(8)]]
    })
    
  //courseRate is a getter function that a reference to the form control of the rate
  get courseProviderRate(){
    return this.courseProviderReviewForm.get('rate');
  }
  
  // getter method for the review
  get courseProviderReview(){
    return this.courseProviderReviewForm.get('review');
  }

  ngOnInit(): void {
  }

}
