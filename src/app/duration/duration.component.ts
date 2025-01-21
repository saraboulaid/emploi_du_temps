import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DurationService } from '../duration.service'; // Service pour gérer les durées

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
})
export class DurationComponent implements OnInit {
  durations: any[] = []; // Initialisation du tableau des durées

  constructor(
    private router: Router,
    private durationService: DurationService
  ) {}

  ngOnInit(): void {
    this.loadDurations();
  }

  // Chargement des durées à partir du service
  loadDurations(): void {
    this.durationService.getDurations().subscribe(
      (data) => {
        this.durations = data; // Assignation des données à la variable durations
      },
      (error) => {
        console.error('Error fetching durations', error); // Gestion d'erreur
      }
    );
  }

  // Méthode pour naviguer vers le formulaire de modification ou ajout
  navigateToForm(route: string) {
    const url = `/duration/${route}`;
    console.log('Navigating to: ', url);
    this.router.navigate([url]);
  }

  // Méthode pour supprimer une durée
  deleteDuration(id: number): void {
    this.durationService.deleteDuration(id).subscribe(
      () => {
        this.durations = this.durations.filter(
          (duration) => duration.id !== id
        ); // Mise à jour après suppression
      },
      (error) => {
        console.error('Error deleting duration', error); // Gestion d'erreur
      }
    );
  }
}
