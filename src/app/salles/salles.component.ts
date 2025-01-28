import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalleService } from '../salle.service'; // Service pour gérer les salles
import { CommonModule } from '@angular/common';
import { CategorieService } from '../categorie.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class SallesComponent implements OnInit {
  salles: any[] = []; // Liste des salles
  error: any | string = ''; // Gestion des erreurs

  constructor(private router: Router, private salleService: SalleService, private categorieService: CategorieService) {}

  ngOnInit(): void {
    // Récupération des données des salles au chargement du composant
    this.salleService.getSalles().subscribe(
      (response) => {
         const sallesWithCategories = response.map((salle: any) => {
          if (salle.categorie) {
            return this.categorieService.getCategorieById(salle.categorie).pipe(
              map((categorie: any) => ({
                ...salle,
                categorie: categorie ? categorie.nom : 'Catégorie inconnue',
              }))
            );
          } else {
            return new Promise((resolve) => {
              resolve({
                ...salle,
                categorie: 'Aucune catégorie', 
              });
            });
          }
        });        

        forkJoin(sallesWithCategories).subscribe(
          (sallesAvecCategories) => {
            this.salles = sallesAvecCategories;
          },
          (error) => {
            console.error('Erreur lors de la récupération des catégories', error);
            this.error = "Une erreur s'est produite lors de la récupération des catégories.";
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des salles', error);
        this.error = "Une erreur s'est produite lors du chargement des données.";
      }
    );
  }

  // Méthode pour naviguer vers le formulaire (ajout ou modification)
  navigateToForm(route: string) {
    const url = `/salles/${route}`;
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

  // Méthode pour supprimer une salle
  deleteSalle(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.salleService.deleteSalle(id).subscribe(
        () => {
          this.salles = this.salles.filter((salle) => salle.id !== id); // Mise à jour locale après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la salle', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
}
