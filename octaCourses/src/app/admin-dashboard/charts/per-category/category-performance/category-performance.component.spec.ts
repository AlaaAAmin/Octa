import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPerformanceComponent } from './category-performance.component';

describe('CategoryPerformanceComponent', () => {
  let component: CategoryPerformanceComponent;
  let fixture: ComponentFixture<CategoryPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
