import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSeanceComponent } from './type-seance.component';

describe('TypeSeanceComponent', () => {
  let component: TypeSeanceComponent;
  let fixture: ComponentFixture<TypeSeanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSeanceComponent]
    });
    fixture = TestBed.createComponent(TypeSeanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
