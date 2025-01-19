import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DurationService } from '../duration.service'; // Service pour gérer les durées

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']

})
export class DurationComponent implements OnInit {
  durations = [
    // Exemple de données
    { id: 1, jour: 'Lundi', debutSeance: '08:00', finSeance: '10:00' },
    { id: 2, jour: 'Mardi', debutSeance: '09:00', finSeance: '11:00' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialisation des données
  }

  navigateToForm(route: string) {
    const url = `/duration/${route}`;
    console.log('Navigating to: ', url);
    this.router.navigate([url]);
  }

  deleteDuration(id: number): void {
    // Logique de suppression de la durée
    this.durations = this.durations.filter(duration => duration.id !== id);
  }
}

