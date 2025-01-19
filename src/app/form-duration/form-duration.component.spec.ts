import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDurationComponent } from './form-duration.component';

describe('FormDurationComponent', () => {
  let component: FormDurationComponent;
  let fixture: ComponentFixture<FormDurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDurationComponent]
    });
    fixture = TestBed.createComponent(FormDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
