import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearArchivoComponent } from './crear-archivo.component';

describe('CrearArchivoComponent', () => {
  let component: CrearArchivoComponent;
  let fixture: ComponentFixture<CrearArchivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearArchivoComponent]
    });
    fixture = TestBed.createComponent(CrearArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
