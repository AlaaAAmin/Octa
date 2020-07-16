import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderCardComponent } from './course-provider-card.component';

describe('CourseProviderCardComponent', () => {
  let component: CourseProviderCardComponent;
  let fixture: ComponentFixture<CourseProviderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProviderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
