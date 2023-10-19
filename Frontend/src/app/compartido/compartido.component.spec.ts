import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartidoComponent } from './compartido.component';

describe('CompartidoComponent', () => {
  let component: CompartidoComponent;
  let fixture: ComponentFixture<CompartidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompartidoComponent]
    });
    fixture = TestBed.createComponent(CompartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
