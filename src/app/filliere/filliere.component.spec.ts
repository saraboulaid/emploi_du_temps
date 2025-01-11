import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilliereComponent } from './filliere.component';

describe('FilliereComponent', () => {
  let component: FilliereComponent;
  let fixture: ComponentFixture<FilliereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilliereComponent]
    });
    fixture = TestBed.createComponent(FilliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
