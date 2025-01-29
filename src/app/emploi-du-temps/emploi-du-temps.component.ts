import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { HttpClient } from '@angular/common/http';
interface Filiere {
  nom: string;
  annee: string;
  semestre: string;
  photo: string;
}

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.css']
})

export class EmploiDuTempsComponent {
  scheduleData: any | null = null; // Pour stocker les données de l'API
  isLoading: boolean = false; // Pour gérer un état de chargement
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Méthode appelée lors du clic sur le bouton
  onGenerateSchedule(): void {
    this.isLoading = true; // Affiche un indicateur de chargement si nécessaire
    this.http.get(`${this.baseUrl}/generate-schedule/`).subscribe({
      next: (data) => {
        this.scheduleData = data; // Stocke les données retournées
        this.isLoading = false; // Arrête le chargement
      },
      error: (error) => {
        console.error('Erreur lors de la génération de l’emploi du temps', error);
        this.isLoading = false; // Arrête le chargement
      },
    });
  }

  // Méthode pour fermer la modal
  closeModal(): void {
    this.scheduleData = null; // Réinitialise les données
  }
}