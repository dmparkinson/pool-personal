import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoAvanceComponent } from './grafico-avance.component';

describe('GraficoAvanceComponent', () => {
  let component: GraficoAvanceComponent;
  let fixture: ComponentFixture<GraficoAvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoAvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
