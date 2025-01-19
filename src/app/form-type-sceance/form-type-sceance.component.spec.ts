import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTypeSceanceComponent } from './form-type-sceance.component';

describe('FormTypeSceanceComponent', () => {
  let component: FormTypeSceanceComponent;
  let fixture: ComponentFixture<FormTypeSceanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormTypeSceanceComponent]
    });
    fixture = TestBed.createComponent(FormTypeSceanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
