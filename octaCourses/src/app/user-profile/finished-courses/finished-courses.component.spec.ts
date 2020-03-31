import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedCoursesComponent } from './finished-courses.component';

describe('FinishedCoursesComponent', () => {
  let component: FinishedCoursesComponent;
  let fixture: ComponentFixture<FinishedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
