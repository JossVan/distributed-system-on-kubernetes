import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte3Component } from './reporte3.component';

describe('Reporte3Component', () => {
  let component: Reporte3Component;
  let fixture: ComponentFixture<Reporte3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reporte3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporte3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
