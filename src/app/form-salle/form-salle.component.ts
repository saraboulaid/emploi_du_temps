import { Component, Input, OnInit } from '@angular/core';
import { SalleService } from '../salle.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-salle',
  templateUrl: './form-salle.component.html',
  styleUrls: ['./form-salle.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormSalleComponent implements OnInit {
  @Input() salle: any = null; // Salle passée en entrée pour édition
  nomSalle: string = ''; // Nom de la salle saisi
  capaciteSalle: number | null = null; // Capacité de la salle saisie
  isEditMode: boolean = false; // Détermine si c'est un ajout ou une modification
  message: string = ''; // Message de retour utilisateur
  categorieSalle: string = ''; // Variable liée à la catégorie sélectionnée
  categories = [
    { id: '1', nom: 'Salle G3EI' },
    { id: '2', nom: 'Salle GINF' },
    { id: '3', nom: 'Salle IND' },
  ];

  constructor(private salleService: SalleService) {}

  ngOnInit(): void {
    // Si une salle est passée, on est en mode édition
    if (this.salle) {
      this.isEditMode = true;
      this.nomSalle = this.salle.nomSalle;
      this.capaciteSalle = this.salle.capaciteSalle;
      this.categorieSalle = this.salle.categorieSalle || ''; // Initialiser la catégorie
    }
  }

  onSubmit(): void {
    if (
      this.nomSalle.trim() &&
      this.capaciteSalle !== null &&
      this.capaciteSalle > 0 &&
      this.categorieSalle
    ) {
      const salleData = {
        nomSalle: this.nomSalle,
        capaciteSalle: this.capaciteSalle,
        categorieSalle: this.categorieSalle, // Ajouter la catégorie
      };

      if (this.isEditMode && this.salle?.id) {
        // Modification d'une salle existante
        this.salleService.updateSalle(this.salle.id, salleData).subscribe({
          next: () => {
            this.message = 'Salle modifiée avec succès.';
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle salle
        this.salleService.addSalle(salleData).subscribe({
          next: () => {
            this.message = 'Salle ajoutée avec succès.';
            this.nomSalle = ''; // Réinitialiser les champs
            this.capaciteSalle = null;
            this.categorieSalle = ''; // Réinitialiser la catégorie
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message =
        'Le nom, la capacité de la salle et la catégorie sont requis et doivent être valides.';
    }
  }
}
