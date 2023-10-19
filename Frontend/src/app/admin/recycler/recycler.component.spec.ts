import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclerComponent } from './recycler.component';

describe('RecyclerComponent', () => {
  let component: RecyclerComponent;
  let fixture: ComponentFixture<RecyclerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecyclerComponent]
    });
    fixture = TestBed.createComponent(RecyclerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
