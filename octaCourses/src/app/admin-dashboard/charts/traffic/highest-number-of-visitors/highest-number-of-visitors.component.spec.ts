import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestNumberOfVisitorsComponent } from './highest-number-of-visitors.component';

describe('HighestNumberOfVisitorsComponent', () => {
  let component: HighestNumberOfVisitorsComponent;
  let fixture: ComponentFixture<HighestNumberOfVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighestNumberOfVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestNumberOfVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
