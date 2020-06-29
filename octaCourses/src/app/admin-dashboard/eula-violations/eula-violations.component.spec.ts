import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EulaViolationsComponent } from './eula-violations.component';

describe('EulaViolationsComponent', () => {
  let component: EulaViolationsComponent;
  let fixture: ComponentFixture<EulaViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulaViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulaViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
