import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-answer-form',
  templateUrl: './course-answer-form.component.html',
  styleUrls: ['./course-answer-form.component.css']
})
export class CourseAnswerFormComponent implements OnInit {

// displayAnsweForm is used to display and hide the answer form after submitting tha answer
displayAnswerForm: boolean = true;
// hideAnswerForm is the function controlling displayAnsweForm
hideAnswerForm(){
  this.displayAnswerForm = false;
}

  constructor( private fb: FormBuilder ) { }

  // fb.group is a formBuilder function used to build a formGroup
  /* courseAnswerForm is a form model representing the entire form values by containing
  the formControls that access the forms input fields' values */
  /* the second element in every form control is for validators
     note: if you want more that one validator then you will make it an array*/
     courseAnswerForm = this.fb.group({
      answer: ['', [Validators.required, Validators.minLength(8)]]
    })
  
  // getter method for the courseAnswer
  get courseAnswer(){
    return this.courseAnswerForm.get('answer');
  }

  ngOnInit(): void {
  }

}
