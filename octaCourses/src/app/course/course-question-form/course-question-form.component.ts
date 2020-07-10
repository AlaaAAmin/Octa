import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-question-form',
  templateUrl: './course-question-form.component.html',
  styleUrls: ['./course-question-form.component.css']
})
export class CourseQuestionFormComponent implements OnInit {

  constructor( private fb: FormBuilder ) { }

    // fb.group is a formBuilder function used to build a formGroup
  /* courseQuestionForm is a form model representing the entire form values by containing
  the formControls that access the forms input fields' values */
  /* the second element in every form control is for validators
     note: if you want more that one validator then you will make it an array*/
     courseQuestionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(8)]]
    })
  
  // getter method for the review
  get courseQuestion(){
    return this.courseQuestionForm.get('question');
  }

  ngOnInit(): void {
  }

}
