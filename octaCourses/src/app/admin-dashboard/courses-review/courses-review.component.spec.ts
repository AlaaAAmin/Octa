import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesReviewComponent } from './courses-review.component';

describe('CoursesReviewComponent', () => {
  let component: CoursesReviewComponent;
  let fixture: ComponentFixture<CoursesReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
