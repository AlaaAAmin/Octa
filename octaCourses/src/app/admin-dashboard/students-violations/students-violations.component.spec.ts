import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsViolationsComponent } from './students-violations.component';

describe('StudentsViolationsComponent', () => {
  let component: StudentsViolationsComponent;
  let fixture: ComponentFixture<StudentsViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
