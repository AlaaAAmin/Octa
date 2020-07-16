import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCourseTestComponent } from './final-course-test.component';

describe('FinalCourseTestComponent', () => {
  let component: FinalCourseTestComponent;
  let fixture: ComponentFixture<FinalCourseTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalCourseTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCourseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
