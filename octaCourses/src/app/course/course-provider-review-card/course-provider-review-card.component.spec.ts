import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderReviewCardComponent } from './course-provider-review-card.component';

describe('CourseProviderReviewCardComponent', () => {
  let component: CourseProviderReviewCardComponent;
  let fixture: ComponentFixture<CourseProviderReviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProviderReviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
