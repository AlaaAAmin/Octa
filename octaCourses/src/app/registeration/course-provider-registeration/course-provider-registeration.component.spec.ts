import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderRegisterationComponent } from './course-provider-registeration.component';

describe('CourseProviderRegisterationComponent', () => {
  let component: CourseProviderRegisterationComponent;
  let fixture: ComponentFixture<CourseProviderRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProviderRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
