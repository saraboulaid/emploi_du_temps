import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ici
@Component({
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html',
  styleUrls: ['./filiere-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
})

export class FiliereFormComponent {
  @Input() filiere: any = { id: null, nomFiliere: '' };
  @Output() save = new EventEmitter<any>();

  filiereForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filiereForm = this.fb.group({
      id: [null],
      nomFiliere: ['', Validators.required],
    });
  }

  ngOnChanges(): void {

    this.filiereForm.patchValue(this.filiere);
  }

  onSubmit(): void {
    if (this.filiereForm.valid) {
      this.save.emit(this.filiereForm.value);
    }
  }
}
