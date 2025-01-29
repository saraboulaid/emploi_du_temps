import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProfFormComponent } from './assign-prof-form.component';

describe('AssignProfFormComponent', () => {
  let component: AssignProfFormComponent;
  let fixture: ComponentFixture<AssignProfFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignProfFormComponent]
    });
    fixture = TestBed.createComponent(AssignProfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
