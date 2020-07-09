import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewCardComponent } from './student-review-card.component';

describe('StudentReviewCardComponent', () => {
  let component: StudentReviewCardComponent;
  let fixture: ComponentFixture<StudentReviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentReviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
