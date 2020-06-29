import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesReviewComponent } from './inquiries-review.component';

describe('InquiriesReviewComponent', () => {
  let component: InquiriesReviewComponent;
  let fixture: ComponentFixture<InquiriesReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiriesReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiriesReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
