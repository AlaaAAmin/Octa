import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { on } from 'process';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  // >>>>>>>>>>>> delete this quiz form section after done <<<<<<<<<<<<<
  // start of quiz form section
  // showQuizForm is just for testing to hide and show the quiz form
  showQuizForm: boolean = true;
  isChecked: boolean = true // true online false offline
  //  and should be deleted after the form is working fine
  // test function for showing the quiz form
  showQuiz() {
    this.showQuizForm = !this.showQuizForm;
  }
  // the function above should also be deleted
  // end of quiz form section


  private newModule: boolean
  private newContent: boolean
  private newLecture: boolean
  constructor(private fb: FormBuilder) {
    this.newModule, this.newContent, this.newLecture = false
  }

  // fb.group is a formBuilder function used to build a formGroup
  /* createCourseForm is a form model representing the entire form values by containing
  the formControls that access the forms input fields' values */

  /* the second element in every form control is for validators
     note: if you want more that one validator then you will make it an array*/
  createCourseForm = this.fb.group({
    courseName: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(50)]],
    courseRequirments: ['', Validators.required],
    price: [null, Validators.required],

    addressList: this.fb.array([]),
    startOfEnrollmentDate: [],
    hours: [null, Validators.required],

    thumbnail: [null, Validators.required],
    courseObjectives: this.fb.array(['']),
    modules: this.fb.array([])


    /*       address: this.fb.group({
            city: [''],
            state: [],
            postalCode: []
          }) */
  })

  get addressListRef() {
    return this.createCourseForm.get('addressList') as FormArray
  }

  // getter for variable that controls showing and hiding module name section
  get isNewModule(): boolean {
    return this.newModule
  }

  // setter for variable that controls showing and hiding module name section
  set newModuleStateSetter(val: boolean) {
    this.newModule = val
  }

  // getter for variable that controls showing and hiding module content type
  get isNewContent(): boolean {
    return this.newContent
  }

  // setter for variable that controls showing and hiding module content type
  set newContentStateSetter(val: boolean) {
    this.newContent = val
  }

  // add new lecture to content array in module
  addNewLecture(moduleIndex) {
    this.newContentStateSetter = !this.isNewContent
    this.moduleContentRef(moduleIndex).push(this.fb.group({
      name: '',
      video: null,
      file: null
    }))
  }

  // getter for video
  getVideoControlRef(moduleIndex, contentIndex): FormControl {
    return this.moduleContentRef(moduleIndex).at(contentIndex).get('video') as FormControl
  }

  // getter for file
  getFileControlRef(moduleIndex, contentIndex): FormControl {
    return this.moduleContentRef(moduleIndex).at(contentIndex).get('file') as FormControl
  }

  //coursenameRef is a getter function that a reference to the form control of the courseName
  get courseNameRef() {
    return this.createCourseForm.get('courseName');
  };

  //coursenameRef is a getter function that a reference to the form control of the courseName
  get thumbnailRef() {
    return this.createCourseForm.get('thumbnail');
  };

  //coursenameRef is a getter function that a reference to the form control of the courseName
  get descriptionRef() {
    return this.createCourseForm.get('description');
  };

  //courseRequirmentsRef is a getter function that a reference to the form control of the courseName
  get courseRequirmentsRef() {
    return this.createCourseForm.get('courseRequirments');
  };

  //coursenameRef is a getter function that a reference to the form control of the courseName
  get hoursRef() {
    return this.createCourseForm.get('hours');
  };

  //coursenameRef is a getter function that a reference to the form control of the courseName
  get priceRef() {
    return this.createCourseForm.get('price');
  };

  //courseObjectivesRef is a getter function that a reference to the form control of the courseName
  get courseObjectivesRef() {
    return this.createCourseForm.get('courseObjectives') as FormArray;
  }

  // addCourseObj method is called to dynamically add new course objective in the form array courseObjectives
  addCourseObj() {
    this.courseObjectivesRef.push(this.fb.control(''));
  }

  //dateRef is a getter function that a reference to the form control of the startOfEnrollmentDate
  get dateRef() {
    return this.createCourseForm.get('startOfEnrollmentDate');
  };

  // getter for modules af formArray
  get courseModulesRef(): FormArray {
    return this.createCourseForm.get('modules') as FormArray
  }

  // getter for content of module 
  moduleContentRef(index: number): FormArray {
    return this.courseModulesRef.at(index).get('content') as FormArray
  }

  // getter for modules controls for ngFor in html file to be iterated
  get modulesRef() {
    return this.createCourseForm.get('modules')
  }
  // addCourseModule is a method to generate new module  
  addCourseModule(moduleName: string) {
    this.newModuleStateSetter = !this.isNewModule
    this.courseModulesRef.push(this.fb.group({
      name: moduleName,
      description: null,
      content: this.fb.array([])
    }))


  }
  ngOnInit(): void {
    if (this.isChecked) {
      // offline features
      this.hoursRef.disable()
      this.addressListRef.disable()
      this.dateRef.disable()

      // online features
      this.modulesRef.enable()

    } else {
      // offline features
      this.hoursRef.enable()
      this.addressListRef.enable()
      this.dateRef.enable()

      // online features
      this.modulesRef.disable()

    }
  }

  addNewAddress() {
    this.addressListRef.push(this.fb.control(''))
  }

  // toggleOnlineOffline is a function that toggle offline and online features
  toggleOnlineOffline(event: MatSlideToggleChange): void {
    if (event.checked) {
      // offline features
      this.hoursRef.disable()
      this.addressListRef.disable()
      this.dateRef.disable()

      // online features
      this.modulesRef.enable()

    } else {
      // offline features
      this.hoursRef.enable()
      this.addressListRef.enable()
      this.dateRef.enable()

      // online features
      this.modulesRef.disable()

    }
  }

  submitForm() {
    console.log(this.createCourseForm.value)


  }

}
