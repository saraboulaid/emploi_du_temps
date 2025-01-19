import { Component, Input, OnInit } from '@angular/core';
import { DurationService } from '../duration.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-duration',
  templateUrl: './form-duration.component.html',
  styleUrls: ['./form-duration.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class FormDurationComponent implements OnInit {
  @Input() duration: any = null; // Durée passée au composant pour édition
  nomDuration: string = ''; // Nom de la durée saisi par l'utilisateur
  isEditMode: boolean = false; // Détermine si le mode est ajout ou édition
  message: string = ''; // Message de feedback pour l'utilisateur

  constructor(private durationService: DurationService) {}

  ngOnInit(): void {
    // Si une durée est passée au composant, on est en mode édition
    if (this.duration) {
      this.isEditMode = true;
      this.nomDuration = this.duration.nomDuration;
    }
  }

  onSubmit(): void {
    if (this.nomDuration.trim()) {
      if (this.isEditMode && this.duration?.id) {
        // Modification d'une durée existante
        this.durationService.updateDuration(this.duration.id, { nomDuration: this.nomDuration }).subscribe({
          next: () => {
            this.message = 'Durée modifiée avec succès.';
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle durée
        this.durationService.addDuration({ nomDuration: this.nomDuration }).subscribe({
          next: () => {
            this.message = 'Durée ajoutée avec succès.';
            this.nomDuration = ''; // Réinitialisation du champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom de la durée est requis.';
    }
  }
}
