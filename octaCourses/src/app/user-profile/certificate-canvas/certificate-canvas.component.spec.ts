import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCanvasComponent } from './certificate-canvas.component';

describe('CertificateCanvasComponent', () => {
  let component: CertificateCanvasComponent;
  let fixture: ComponentFixture<CertificateCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
