import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatisticsComponent } from './financial-statistics.component';

describe('FinancialStatisticsComponent', () => {
  let component: FinancialStatisticsComponent;
  let fixture: ComponentFixture<FinancialStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
