import { Component, Input, OnInit } from '@angular/core';
import { SalleService } from '../salle.service';
import { CategorieService } from '../categorie.service'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-salle',
  templateUrl: './form-salle.component.html',
  styleUrls: ['./form-salle.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormSalleComponent implements OnInit {
  error: any | string = ''; // Gestion des erreurs
  @Input() salle: any = null; // Salle passée en entrée pour édition
  nomSalle: string = ''; // Nom de la salle saisi
  capaciteSalle: number | null = null; // Capacité de la salle saisie
  isEditMode: boolean = false; // Détermine si c'est un ajout ou une modification
  message: string = ''; // Message de retour utilisateur
  categorieSalle: string = ''; // Variable liée à la catégorie sélectionnée
  categories: any[] = []; // Tableau pour stocker les catégories

  constructor(private salleService: SalleService, private categorieService: CategorieService, private router: Router) {}

  ngOnInit(): void {
    // Chargement des catégories
    this.categorieService.getCategories().subscribe({
      next: (categories) => {
        // Remplir le tableau des catégories
        this.categories = categories;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories');
      },
  });
    // Si une salle est passée, on est en mode édition
    if (this.salle) {
      this.isEditMode = true;
      this.nomSalle = this.salle.nom;
      this.capaciteSalle = this.salle.effectif;
      this.categorieService.getCategorieById(this.salle.categorie).subscribe(
        (categorie) => {
          this.categorieSalle = categorie.nom; // Accéder à la propriété 'nom'
        },
        (error) => {
          this.error = 'Erreur lors du chargement de la catégorie';
          console.error(error);
        }
      );}
  }

  onSubmit(): void {
    if (
      this.nomSalle.trim() &&
      this.capaciteSalle !== null &&
      this.capaciteSalle > 0 
    ) {
      const salleData = {
        nom: this.nomSalle,
        effectif: this.capaciteSalle,
        categorie: this.categorieSalle, // Ajouter la catégorie
      };

      if (this.isEditMode && this.salle?.id) {
        // Modification d'une salle existante
        this.salleService.updateSalle(this.salle.id, salleData).subscribe({
          next: () => {
            this.message = 'Salle modifiée avec succès.';
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle salle
        this.salleService.addSalle(salleData).subscribe({
          next: () => {
            this.message = 'Salle ajoutée avec succès.';
            this.router.navigate(['/salles']);
            this.nomSalle = ''; // Réinitialiser les champs
            this.capaciteSalle = null;
            this.categorieSalle = ''; // Réinitialiser la catégorie
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message =
        'Le nom, la capacité de la salle et la catégorie sont requis et doivent être valides.';
    }
  }
}
