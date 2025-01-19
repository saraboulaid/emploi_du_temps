import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfService } from '../prof.service'; // Service pour gérer les professeurs

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css'],
  standalone: true
})
export class ProfsComponent implements OnInit {
  profs: any[] = []; // Liste des professeurs
  error: any | string = ''; // Gestion des erreurs

  constructor(private router: Router, private profService: ProfService) {} // Injection du Router et du service

  ngOnInit(): void {

    this.profService.getProfs().subscribe(
      (response) => {
        this.profs = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des professeurs', error);
        this.error = 'Une erreur s\'est produite lors du chargement des données.';
      }
    );
  }


  navigateToForm(route: string) {
    const url = `/profs/${route}`;
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

  // Méthode pour supprimer un professeur
  deleteProf(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      this.profService.deleteProf(id).subscribe(
        () => {
          this.profs = this.profs.filter((prof) => prof.id !== id); // Mise à jour locale après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du professeur', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
}
