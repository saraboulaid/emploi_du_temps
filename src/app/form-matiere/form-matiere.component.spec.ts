import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMatiereComponent } from './form-matiere.component';

describe('FormMatiereComponent', () => {
  let component: FormMatiereComponent;
  let fixture: ComponentFixture<FormMatiereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMatiereComponent]
    });
    fixture = TestBed.createComponent(FormMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
