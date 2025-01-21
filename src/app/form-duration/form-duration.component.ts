import { Component, Input, OnInit } from '@angular/core';
import { DurationService } from '../duration.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-duration',
  templateUrl: './form-duration.component.html',
  styleUrls: ['./form-duration.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormDurationComponent implements OnInit {
  isEditMode: boolean = false; // Mode : ajout ou modification
  jour: string = ''; // Jour sélectionné
  horaireDebut: string = ''; // Heure de début
  horaireFin: string = ''; // Heure de fin
  message: string = ''; // Message de feedback utilisateur
  validationError: string = ''; // Message d'erreur de validation
  retourApi: any = null; // Données retournées par l'API
  id: number | null = null; // ID de la durée (utilisé en mode édition)

  jours: string[] = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ]; // Liste des jours

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private durationService: DurationService
  ) {}

  ngOnInit(): void {
    // Vérification de l'ID dans l'URL pour activer le mode édition
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.id = +id; // Conversion de l'ID en nombre
        this.loadDurationData(this.id); // Charger les données de la durée
      }
    });
  }

  loadDurationData(id: number): void {
    this.durationService.getDurationById(id).subscribe(
      (data) => {
        this.jour = data.jour;
        this.horaireDebut = data.horaire_debut_seance;
        this.horaireFin = data.horaire_fin_seance;
      },
      (error) => {
        this.message = 'Erreur lors du chargement des données.';
        console.error(error);
      }
    );
  }

  validateTimes(): void {
    if (this.horaireDebut && this.horaireFin) {
      const debut = this.convertTimeToMinutes(this.horaireDebut);
      const fin = this.convertTimeToMinutes(this.horaireFin);

      if (debut >= fin) {
        this.validationError =
          "L'heure de début doit être avant l'heure de fin.";
      } else if (fin - debut < 90) {
        this.validationError =
          "L'intervalle entre le début et la fin doit être d'au moins 1h30.";
      } else {
        this.validationError = '';
      }
    }
  }

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  onSubmit(): void {
    if (!this.validationError) {
      const durationData = {
        jour: this.jour,
        horaire_debut_seance: this.horaireDebut,
        horaire_fin_seance: this.horaireFin,
      };

      if (this.isEditMode) {
        // Vérifie que l'ID de la durée est défini pour la mise à jour
        if (!this.id) {
          this.message =
            "L'ID de la durée est introuvable pour la mise à jour.";
          return;
        }

        // Mise à jour de la durée
        this.durationService.updateDuration(this.id, durationData).subscribe(
          (response) => {
            this.message = 'Durée modifiée avec succès.';
            this.router.navigate(['/duration']); // Redirection vers la liste des durées
          },
          (error) => {
            console.error('Erreur lors de la modification de la durée', error);
            this.message = 'Une erreur est survenue lors de la modification.';
          }
        );
      } else {
        // Ajout d'une nouvelle durée
        this.durationService.addDuration(durationData).subscribe(
          (response) => {
            this.message = 'Durée ajoutée avec succès.';
            this.retourApi = response; // Stockage du retour JSON
            this.router.navigate(['/duration']); // Redirection vers la liste des durées
          },
          (error) => {
            this.message = "Une erreur est survenue lors de l'ajout.";
            console.error(error);
          }
        );
      }
    }
  }
}
