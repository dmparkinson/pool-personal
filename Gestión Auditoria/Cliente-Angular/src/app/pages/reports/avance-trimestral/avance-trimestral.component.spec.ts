import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceTrimestralComponent } from './avance-trimestral.component';

describe('AvanceTrimestralComponent', () => {
  let component: AvanceTrimestralComponent;
  let fixture: ComponentFixture<AvanceTrimestralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceTrimestralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceTrimestralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
