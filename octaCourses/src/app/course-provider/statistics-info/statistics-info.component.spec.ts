import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsInfoComponent } from './statistics-info.component';

describe('StatisticsInfoComponent', () => {
  let component: StatisticsInfoComponent;
  let fixture: ComponentFixture<StatisticsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
