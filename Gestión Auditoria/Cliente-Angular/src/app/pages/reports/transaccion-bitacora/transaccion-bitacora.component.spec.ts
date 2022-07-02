import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionBitacoraComponent } from './transaccion-bitacora.component';

describe('TransaccionBitacoraComponent', () => {
  let component: TransaccionBitacoraComponent;
  let fixture: ComponentFixture<TransaccionBitacoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionBitacoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
