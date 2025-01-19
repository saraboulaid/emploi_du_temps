import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliereFormComponent } from './filiere-form.component';

describe('FiliereFormComponent', () => {
  let component: FiliereFormComponent;
  let fixture: ComponentFixture<FiliereFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiliereFormComponent]
    });
    fixture = TestBed.createComponent(FiliereFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
