import { Component, OnInit } from '@angular/core';
import { CategorieService } from "../categorie.service";
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";  // Import du Router

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CategorieComponent implements OnInit {

  categories: any[] = [];
  error: any | string = " ";
  message: string = '';
  constructor( private router: Router, private categorieService: CategorieService) {}  // Injection du Router


  ngOnInit(): void {
    this.categorieService.getCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }
  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories', err);
        this.message = 'Impossible de charger les catégories.';
      }
    });
  }

  navigateToForm(route: string) {
    const url = `/categorie/${route}`;
    console.log('Navigating to: ', url);
    this.router.navigate([url]);
  }
  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette Ctégorie ?')) {
      this.categorieService.deleteCategorie(id).subscribe({
        next: () => {
          this.message = 'Ctégorie supprimée avec succès.';
          this.loadCategories();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la Catégorie', err);
          this.message = `Erreur lors de la suppression : ${err.message}`;
        }
      });
    }
  }


}
