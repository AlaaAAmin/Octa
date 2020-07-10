import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseQuestionCardComponent } from './course-question-card.component';

describe('CourseQuestionCardComponent', () => {
  let component: CourseQuestionCardComponent;
  let fixture: ComponentFixture<CourseQuestionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseQuestionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
