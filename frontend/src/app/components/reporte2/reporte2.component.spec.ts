import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reporte2Component } from './reporte2.component';

describe('Reporte2Component', () => {
  let component: Reporte2Component;
  let fixture: ComponentFixture<Reporte2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reporte2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Reporte2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
