import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderReviewFormComponent } from './course-provider-review-form.component';

describe('CourseProviderReviewFormComponent', () => {
  let component: CourseProviderReviewFormComponent;
  let fixture: ComponentFixture<CourseProviderReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProviderReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
