import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ici
@Component({
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html',
  styleUrls: ['./filiere-form.component.css'],
  standalone: true, // Déclare le composant comme autonome
  imports: [CommonModule, FormsModule,ReactiveFormsModule], // Importe les modules nécessaires
})

export class FiliereFormComponent {
  @Input() filiere: any = { id: null, nomFiliere: '' }; // Par défaut, pas d'ID pour l'ajout
  @Output() save = new EventEmitter<any>();

  filiereForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filiereForm = this.fb.group({
      id: [null],
      nomFiliere: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    // Préremplir le formulaire si des données de filière sont passées
    this.filiereForm.patchValue(this.filiere);
  }

  onSubmit(): void {
    if (this.filiereForm.valid) {
      this.save.emit(this.filiereForm.value);
    }
  }
}
