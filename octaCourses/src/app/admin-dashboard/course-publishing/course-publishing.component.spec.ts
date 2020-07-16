import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePublishingComponent } from './course-publishing.component';

describe('CoursePublishingComponent', () => {
  let component: CoursePublishingComponent;
  let fixture: ComponentFixture<CoursePublishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePublishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePublishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
