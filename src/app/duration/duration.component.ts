import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DurationService } from '../duration.service'; // Service pour gérer les durées

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
})
export class DurationComponent implements OnInit {
  durations: any[] = []; // Liste des durées
  error: any | string = ''; // Gestion des erreurs

  constructor(private router: Router, private durationService: DurationService) {}

  ngOnInit(): void {
    // Récupération des données des durées au chargement du composant
    this.durationService.getDurations().subscribe(
      (response) => {
        this.durations = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des durées', error);
        this.error = 'Une erreur s\'est produite lors du chargement des données.';
      }
    );
  }

  // Méthode pour naviguer vers le formulaire (ajout ou modification)
  navigateToForm(route: string) {
    const url = `/durations/${route}`;
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

  // Méthode pour supprimer une durée
  deleteDuration(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette durée ?')) {
      this.durationService.deleteDuration(id).subscribe(
        () => {
          this.durations = this.durations.filter((duration) => duration.id !== id); // Mise à jour locale après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la durée', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
}
