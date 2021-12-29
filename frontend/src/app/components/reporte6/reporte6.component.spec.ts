import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte6Component } from './reporte6.component';

describe('Reporte6Component', () => {
  let component: Reporte6Component;
  let fixture: ComponentFixture<Reporte6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reporte6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporte6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
