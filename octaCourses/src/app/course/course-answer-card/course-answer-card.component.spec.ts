import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnswerCardComponent } from './course-answer-card.component';

describe('CourseAnswerCardComponent', () => {
  let component: CourseAnswerCardComponent;
  let fixture: ComponentFixture<CourseAnswerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnswerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
