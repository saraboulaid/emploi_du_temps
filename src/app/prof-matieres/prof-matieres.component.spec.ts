import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfMatieresComponent } from './prof-matieres.component';

describe('ProfMatieresComponent', () => {
  let component: ProfMatieresComponent;
  let fixture: ComponentFixture<ProfMatieresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfMatieresComponent]
    });
    fixture = TestBed.createComponent(ProfMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
