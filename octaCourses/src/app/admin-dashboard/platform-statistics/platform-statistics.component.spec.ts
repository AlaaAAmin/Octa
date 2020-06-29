import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformStatisticsComponent } from './platform-statistics.component';

describe('PlatformStatisticsComponent', () => {
  let component: PlatformStatisticsComponent;
  let fixture: ComponentFixture<PlatformStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
