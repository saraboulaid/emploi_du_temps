import { Component, Input, OnInit } from '@angular/core';
import { TypeSceanceService } from '../type-sceance.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-type-sceance',
  templateUrl: './form-type-sceance.component.html',
  styleUrls: ['./form-type-sceance.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class FormTypeSceanceComponent implements OnInit {
  @Input() typeSceance: any = null; // Type de séance passé en entrée pour édition
  nomTypeSceance: string = ''; // Nom du type de séance saisi
  isEditMode: boolean = false; // Détermine si c'est un ajout ou une modification
  message: string = ''; // Message de retour utilisateur

  constructor(private typeSceanceService: TypeSceanceService) {}

  ngOnInit(): void {
    // Si un type de séance est passé, on est en mode édition
    if (this.typeSceance) {
      this.isEditMode = true;
      this.nomTypeSceance = this.typeSceance.nomTypeSceance;
    }
  }

  onSubmit(): void {
    if (this.nomTypeSceance.trim()) {
      if (this.isEditMode && this.typeSceance?.id) {
        // Modification d'un type de séance existant
        this.typeSceanceService
          .updateTypeSeance(this.typeSceance.id, { nomTypeSceance: this.nomTypeSceance })
          .subscribe({
            next: () => {
              this.message = 'Type de séance modifié avec succès.';
            },
            error: (err) => {
              this.message = `Erreur lors de la modification : ${err.message}`;
            },
          });
      } else {
        // Ajout d'un nouveau type de séance
        this.typeSceanceService.addTypeSeance({ nomTypeSceance: this.nomTypeSceance }).subscribe({
          next: () => {
            this.message = 'Type de séance ajouté avec succès.';
            this.nomTypeSceance = ''; // Réinitialiser le champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom du type de séance est requis.';
    }
  }
}
