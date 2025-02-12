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
    this.isLoading = true;
  
    this.http.get(`${this.baseUrl}/generate-schedule/`, { responseType: 'blob' }).subscribe({
      next: (response) => {
        this.isLoading = false;
  
        // Créer un objet Blob pour le fichier PDF
        const blob = new Blob([response], { type: 'application/pdf' });
  
        // Créer un lien de téléchargement
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'emplois_du_temps.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Libérer l'URL de l'objet
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erreur lors de la génération de l’emploi du temps', error);
        this.isLoading = false;
      },
    });
  }
  

  // Méthode pour fermer la modal
  closeModal(): void {
    this.scheduleData = null; // Réinitialise les données
  }
}