import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInsightComponent } from './course-insight.component';

describe('CourseInsightComponent', () => {
  let component: CourseInsightComponent;
  let fixture: ComponentFixture<CourseInsightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInsightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
