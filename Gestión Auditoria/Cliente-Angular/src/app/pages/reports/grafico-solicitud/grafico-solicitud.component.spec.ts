import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSolicitudComponent } from './grafico-solicitud.component';

describe('FinalizadoSolicitudComponent', () => {
  let component: GraficoSolicitudComponent;
  let fixture: ComponentFixture<GraficoSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
