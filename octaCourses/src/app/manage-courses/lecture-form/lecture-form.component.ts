import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lecture-form',
  templateUrl: './lecture-form.component.html',
  styleUrls: ['./lecture-form.component.css']
})
export class LectureFormComponent implements OnInit {

  // 1 way data binding to pass form controls to this component
  @Input() lectureContent: FormGroup
  constructor(private sanitizer: DomSanitizer) { }

  videoURL: SafeUrl
  ngOnInit(): void {
  }

  // readVideoFile is a function to read metadata from video and save it to form 
  readVideoFile(event) {
    let file = event.target.files
    if (file && file[0]) {
      this.lectureContent.value.video = file[0] as File
      this.videoURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file[0]))
    }
  }

  // readFile is a function to read metadata from file and save it to form 
  readFile(event) {
    let file = event.target.files
    if (file && file[0]) {
      this.lectureContent.value.file = file[0] as File
    }
  }

  // readVideoFile is a function to read metadata from video when loaded like its duration and save it to form 
  getVideoDuration(event) {
    let duration = event.target.duration
    if (!(this.lectureContent.value.duration) && this.lectureContent.value.video)
      this.lectureContent.value.duration = duration
  }

}
