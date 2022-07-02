import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiosSolicitudComponent } from './cambios-solicitud.component';

describe('CambiosSolicitudComponent', () => {
  let component: CambiosSolicitudComponent;
  let fixture: ComponentFixture<CambiosSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiosSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiosSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
