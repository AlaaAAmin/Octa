import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCourseEnrollmentComponent } from './close-course-enrollment.component';

describe('CloseCourseEnrollmentComponent', () => {
  let component: CloseCourseEnrollmentComponent;
  let fixture: ComponentFixture<CloseCourseEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseCourseEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseCourseEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
