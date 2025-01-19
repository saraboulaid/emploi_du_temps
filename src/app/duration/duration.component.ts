import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DurationService } from '../duration.service'; // Service pour gérer les durées

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  standalone: true
})
export class DurationComponent implements OnInit {
  durations: any[] = [];
  error: any | string = '';

  constructor(private router: Router, private durationService: DurationService) {}

  ngOnInit(): void {
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

  navigateToForm(route: string) {
    const url = `/duration/${route}`;
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

  deleteDuration(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette durée ?')) {
      this.durationService.deleteDuration(id).subscribe(
        () => {
          this.durations = this.durations.filter((duration) => duration.id !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la durée', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
}
