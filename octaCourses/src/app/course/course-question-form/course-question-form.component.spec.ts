import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseQuestionFormComponent } from './course-question-form.component';

describe('CourseQuestionFormComponent', () => {
  let component: CourseQuestionFormComponent;
  let fixture: ComponentFixture<CourseQuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseQuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
