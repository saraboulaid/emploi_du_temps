import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TypeSceanceService } from '../type-sceance.service';
import { CommonModule } from '@angular/common';
import { MatiereService } from '../matiere.service';
import { CategorieService } from '../categorie.service';
import { ProfService } from '../prof.service';

@Component({
  selector: 'app-type-seance',
  templateUrl: './type-seance.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./type-seance.component.css'],
})
export class TypeSeanceComponent {
  typeSeances: any[] = [];

  constructor(
    private router: Router,
    private typeSeanceService: TypeSceanceService,
    private matiereService: MatiereService,
    private categorieService: CategorieService,
    private professeurService: ProfService // Injecter le service Professeur
  ) {}

  ngOnInit(): void {
    this.loadTypeSeances();
  }

  loadTypeSeances(): void {
    this.typeSeanceService.getTypeSeances().subscribe({
      next: (data) => {
        // Initialiser les propriétés du type de séance
        this.typeSeances = data.map((ts) => ({
          ...ts,
          categorieName: '',
          matiereName: '',
          professeurName: '', // Ajouter professeurName
        }));

        // Charger les catégories et matières
        this.typeSeances.forEach((ts) => {
          // Charger les informations de catégorie
          this.categorieService
            .getCategorieById(ts.categorie)
            .subscribe((categorie) => {
              ts.categorieName = categorie.nom;
            });

          // Charger les informations de matière
          this.matiereService
            .getMatiereById(ts.matiere)
            .subscribe((matiere) => {
              ts.matiereName = matiere.nom;
            });

          // Charger les informations du professeur
          // this.professeurService
          //   .getProfById(ts.professeurId) // Utiliser id_prof
          //   .subscribe((professeur) => {
          //     ts.professeurName = professeur.nom;
          //   });
        });
      },
      error: (err) => console.error('Erreur de chargement :', err),
    });
  }

  navigateToForm(route: string): void {
    const url = `/type_seance/${route}`;
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

  deleteTypeSeance(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce type de séance ?')) {
      this.typeSeanceService.deleteTypeSeance(id).subscribe({
        next: () => {
          this.typeSeances = this.typeSeances.filter((ts) => ts.id !== id);
        },
        error: (err) => console.error('Erreur de suppression :', err),
      });
    }
  }
}
