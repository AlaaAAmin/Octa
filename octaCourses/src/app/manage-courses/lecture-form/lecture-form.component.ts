import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lecture-form',
  templateUrl: './lecture-form.component.html',
  styleUrls: ['./lecture-form.component.css']
})
export class LectureFormComponent implements OnInit {

  // 1 way data binding to pass form controls to this component
  @Input() videoController: FormControl
  @Input() fileController: FormControl
  @Input() nameController: FormControl
  constructor() { }

  ngOnInit(): void {
  }

}
