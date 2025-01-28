import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../matiere.service';
import { Router} from '@angular/router';
import { CategorieService } from '../categorie.service';
import { TypeSceanceService } from '../type-sceance.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-type-seance',
  templateUrl: './type-seance.component.html',
  styleUrls: ['./type-seance.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TypeSeanceComponent implements OnInit {
  typeSeances: any[] = []; 
  error: string = ''; // Gestion des erreurs

  constructor(
    private router: Router,
    private typeSeanceService: TypeSceanceService,
    private matiereService: MatiereService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.loadTypeSeances();
  }

  private loadTypeSeances(): void {
    this.typeSeanceService.getTypeSeances().subscribe({
      next: (response) => {
        const typeSeancesWithRelatedData = response.map((typeSeance: any) => {
          const categoryObservable = typeSeance.categorie
            ? this.categorieService.getCategorieById(typeSeance.categorie).pipe(
                map((categorie: any) => ({
                  ...typeSeance,
                  categorie: categorie ? categorie.nom : 'Catégorie inconnue',
                }))
              )
            : new Promise((resolve) => {
                resolve({ ...typeSeance, categorie: 'Aucune catégorie' });
              });

          const matiereObservable = typeSeance.matiere
            ? this.matiereService.getMatiereById(typeSeance.matiere).pipe(
                map((matiere: any) => ({
                  ...typeSeance,
                  matiere: matiere ? matiere.nom : 'Matière inconnue',
                }))
              )
            : new Promise((resolve) => {
                resolve({ ...typeSeance, matiere: 'Aucune matière' });
              });

          return forkJoin([categoryObservable, matiereObservable]).pipe(
            map(([typeSeanceWithCategory, typeSeanceWithMatiere]) => ({
              ...typeSeanceWithCategory,
              ...typeSeanceWithMatiere,
              volume_horaire_total: typeSeanceWithCategory.volume_horaire_total || 0,
              volume_horaire_semaine: typeSeanceWithCategory.volume_horaire_semaine || 0,
            }))
          );
        });

        forkJoin(typeSeancesWithRelatedData).subscribe({
          next: (typeSeancesAvecRelatedData) => {
            this.typeSeances = typeSeancesAvecRelatedData;
          },
          error: (err) => {
            console.error('Erreur lors du traitement des types de séances', err);
            this.error = 'Une erreur s\'est produite lors du traitement des types de séances.';
          },
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des types de séances', err);
        this.error = 'Une erreur s\'est produite lors du chargement des types de séances.';
      },
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
          // Suppression locale après réussite
          this.typeSeances = this.typeSeances.filter((typeSeance) => typeSeance.id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du type de séance', err);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }
}
