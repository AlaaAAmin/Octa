import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDailyActiveUsersComponent } from './average-daily-active-users.component';

describe('AverageDailyActiveUsersComponent', () => {
  let component: AverageDailyActiveUsersComponent;
  let fixture: ComponentFixture<AverageDailyActiveUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageDailyActiveUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageDailyActiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
