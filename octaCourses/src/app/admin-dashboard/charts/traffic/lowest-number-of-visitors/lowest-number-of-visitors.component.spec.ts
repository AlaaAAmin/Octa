import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowestNumberOfVisitorsComponent } from './lowest-number-of-visitors.component';

describe('LowestNumberOfVisitorsComponent', () => {
  let component: LowestNumberOfVisitorsComponent;
  let fixture: ComponentFixture<LowestNumberOfVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowestNumberOfVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowestNumberOfVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
