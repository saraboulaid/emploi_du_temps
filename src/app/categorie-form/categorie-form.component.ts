import { Component, Input, OnInit } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class CategorieFormComponent implements OnInit {
  @Input() categorie: any = null;
  nomCategorie: string = '';
  isEditMode: boolean = false;
  message: string = '';
  id: number | null = null;
  constructor(
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.loadCategorie(Number(this.id)); 
    }
  }
  loadCategorie(id: number): void {
    this.categorieService.getCategorieById(id).subscribe({
      next: (categorie) => {
        this.nomCategorie = categorie.nom; 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la catégorie', err);
        this.message = 'Impossible de charger la catégorie.';
      },
    });
  }

  onSubmit(): void {
    if (this.nomCategorie.trim()) {
      if (this.isEditMode && this.id) {
        // Appel au service pour la modification
        this.categorieService
          .updateCategorie(this.id, { nom: this.nomCategorie })
          .subscribe({
            next: () => {
              this.message = 'Catégorie modifiée avec succès.';
              this.router.navigate(['/categorie']);
            },
            error: (err) => {
              this.message = `Erreur lors de la modification : ${err.message}`;
            },
          });
      } else {
        // Appel au service pour l'ajout
        this.categorieService.addCategorie({ nom: this.nomCategorie }).subscribe({
          next: () => {
            this.message = 'Catégorie ajoutée avec succès.';
            this.router.navigate(['categorie']);
            this.nomCategorie = ''; // Réinitialiser le champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom de la catégorie est requis.';
    }
  }
}
