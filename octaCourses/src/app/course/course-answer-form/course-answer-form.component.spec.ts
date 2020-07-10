import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnswerFormComponent } from './course-answer-form.component';

describe('CourseAnswerFormComponent', () => {
  let component: CourseAnswerFormComponent;
  let fixture: ComponentFixture<CourseAnswerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnswerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnswerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
