import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderCardPreviewComponent } from './course-provider-card-preview.component';

describe('CourseProviderCardPreviewComponent', () => {
  let component: CourseProviderCardPreviewComponent;
  let fixture: ComponentFixture<CourseProviderCardPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProviderCardPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
