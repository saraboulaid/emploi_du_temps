import { Component, Input, OnInit } from '@angular/core';
import { SalleService } from '../salle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-salle',
  templateUrl: './form-salle.component.html',
  styleUrls: ['./form-salle.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class FormSalleComponent implements OnInit {
  @Input() salle: any = null; // Salle passée en entrée pour édition
  nomSalle: string = ''; // Nom de la salle saisi
  capaciteSalle: number | null = null; // Capacité de la salle saisie
  isEditMode: boolean = false; // Détermine si c'est un ajout ou une modification
  message: string = ''; // Message de retour utilisateur

  constructor(private salleService: SalleService) {}

  ngOnInit(): void {
    // Si une salle est passée, on est en mode édition
    if (this.salle) {
      this.isEditMode = true;
      this.nomSalle = this.salle.nomSalle;
      this.capaciteSalle = this.salle.capaciteSalle;
    }
  }

  onSubmit(): void {
    if (this.nomSalle.trim() && this.capaciteSalle !== null && this.capaciteSalle > 0) {
      if (this.isEditMode && this.salle?.id) {
        // Modification d'une salle existante
        this.salleService.updateSalle(this.salle.id, { nomSalle: this.nomSalle, capaciteSalle: this.capaciteSalle }).subscribe({
          next: () => {
            this.message = 'Salle modifiée avec succès.';
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle salle
        this.salleService.addSalle({ nomSalle: this.nomSalle, capaciteSalle: this.capaciteSalle }).subscribe({
          next: () => {
            this.message = 'Salle ajoutée avec succès.';
            this.nomSalle = ''; // Réinitialiser les champs
            this.capaciteSalle = null;
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom et la capacité de la salle sont requis et doivent être valides.';
    }
  }
}
