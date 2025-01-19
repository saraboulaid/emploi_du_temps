import { Component, Input, OnInit } from '@angular/core';
import { MatiereService } from '../matiere.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-matiere',
  templateUrl: './form-matiere.component.html',
  styleUrls: ['./form-matiere.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class FormMatiereComponent implements OnInit {
  @Input() matiere: any = null; // Matière passée pour édition
  nomMatiere: string = ''; // Nom de la matière saisi
  isEditMode: boolean = false; // Détermine le mode : ajout ou édition
  message: string = ''; // Message de feedback utilisateur

  constructor(private matiereService: MatiereService) {}

  ngOnInit(): void {
    // Si une matière est passée, on est en mode édition
    if (this.matiere) {
      this.isEditMode = true;
      this.nomMatiere = this.matiere.nomMatiere;
    }
  }

  onSubmit(): void {
    if (this.nomMatiere.trim()) {
      if (this.isEditMode && this.matiere?.id) {
        // Modification d'une matière existante
        this.matiereService.updateMatiere(this.matiere.id, { nomMatiere: this.nomMatiere }).subscribe({
          next: () => {
            this.message = 'Matière modifiée avec succès.';
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle matière
        this.matiereService.addMatiere({ nomMatiere: this.nomMatiere }).subscribe({
          next: () => {
            this.message = 'Matière ajoutée avec succès.';
            this.nomMatiere = ''; // Réinitialisation du champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom de la matière est requis.';
    }
  }
}
