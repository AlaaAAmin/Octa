import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  // fb.group is a formBuilder function used to build a formGroup
  /* createCourseForm is a form model representing the entire form values by containing
  the formControls that access the forms input fields' values */

  /* the second element in every form control is for validators
     note: if you want more that one validator then you will make it an array*/
     createCourseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      courseRequirments: ['', Validators.required],
      hours: [, Validators.required],
      price: [, Validators.required],
      thumbnail: [, Validators.required],
      courseObjectives: this.fb.array(['']),
      startOfEnrollmentDate: [,Validators.required]
/*       address: this.fb.group({
        city: [''],
        state: [],
        postalCode: []
      }) */
    })
  
    //coursenameRef is a getter function that a reference to the form control of the courseName
    get courseNameRef(){
      return this.createCourseForm.get('courseName');
    };
  
    //coursenameRef is a getter function that a reference to the form control of the courseName
    get thumbnailRef(){
      return this.createCourseForm.get('thumbnail');
    };
  
    //coursenameRef is a getter function that a reference to the form control of the courseName
    get descriptionRef(){
      return this.createCourseForm.get('description');
    };
  
    //courseRequirmentsRef is a getter function that a reference to the form control of the courseName
    get courseRequirmentsRef(){
      return this.createCourseForm.get('courseRequirments');
    };
  
    //coursenameRef is a getter function that a reference to the form control of the courseName
    get hoursRef(){
      return this.createCourseForm.get('hours');
    };
  
    //coursenameRef is a getter function that a reference to the form control of the courseName
    get priceRef(){
      return this.createCourseForm.get('price');
    };
  
    //courseObjectivesRef is a getter function that a reference to the form control of the courseName
    get courseObjectivesRef(){
      return this.createCourseForm.get('courseObjectives') as FormArray;
    }

    // addCourseObj method is called to dynamically add new course objective in the form array courseObjectives
    addCourseObj(){
      this.courseObjectivesRef.push(this.fb.control(''));
    }

    //dateRef is a getter function that a reference to the form control of the startOfEnrollmentDate
    get dateRef(){
      return this.createCourseForm.get('startOfEnrollmentDate');
    };

  ngOnInit(): void {
  }

}
