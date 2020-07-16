import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-final-course-test',
  templateUrl: './final-course-test.component.html',
  styleUrls: ['./final-course-test.component.css']
})
export class FinalCourseTestComponent implements OnInit {

// start of hiding and showing the courses conatiner and final test form
hideFinalQuestionsSection: boolean = true;
hideCoursesSection: boolean = false;
displayTestSection(){
  this.hideFinalQuestionsSection = false;
  this.hideCoursesSection = true;
}
// end of hiding and showing the courses conatiner and final test form

  // the array below is just for testing
  cDescription='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore odio repellat porro quaerat saepe reiciendis voluptate! Accusamus vitae ducimus'
  courses= [
    {name: 'IT', description: this.cDescription, date: '2020/6/27', id: 1234},
    {name: 'IOT', description: this.cDescription, date: '2020/6/27', id: 4567},
    {name: 'Angular', description: this.cDescription, date: '2020/6/27', id: 4565},
    {name: 'Angular', description: this.cDescription, date: '2020/6/27', id: 4565},
    {name: 'Network', description: this.cDescription, date: '2020/6/27', id: 5678}
  ];


  constructor( private fb: FormBuilder ) { }

  // fb.group is a formBuilder function used to build a formGroup
  /* coursefinalTestForm is a form model representing the entire form values by containing
  the formControls that access the forms input fields' values */
  /* the second element in every form control is for validators
     note: if you want more that one validator then you will make it an array*/
     coursefinalTestForm = this.fb.group({
       // time representing the duration of the test
    time: [, [Validators.required, Validators.min(5), Validators.max(180)]],
    numberOfQuestions: [, [Validators.required, Validators.min(10)]],

    // questions should control the number of quiz form will appear and hold the data of them
    // or do what you see the right
    questions: this.fb.array([''])
  })
  
//testTime is a getter function that a reference to the form control of the time
get testTime(){
  return this.coursefinalTestForm.get('time');
}

// getter method for the numberOfQuestions
get numberOfTestQuestions(){
  return this.coursefinalTestForm.get('numberOfQuestions');
}

  // the following two functions can be used or note it is your choice but if not used remove them
  //testQuestionsRef is a getter function that a reference to the form control of the questions
  get testQuestionsRef() {
    return this.coursefinalTestForm.get('questions') as FormArray;
  }

  // addTestQuestion method is called to dynamically add new course objective in the form array questions
  addTestQuestion() {
    this.testQuestionsRef.push(this.fb.control(''));
  }

  ngOnInit(): void {
  }

}
