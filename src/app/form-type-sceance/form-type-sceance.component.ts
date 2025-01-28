import { Component, Input, OnInit } from '@angular/core';
import { TypeSceanceService } from '../type-sceance.service';
import { CategorieService } from '../categorie.service';
import { MatiereService } from '../matiere.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-type-sceance',
  templateUrl: './form-type-sceance.component.html',
  styleUrls: ['./form-type-sceance.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormTypeSceanceComponent implements OnInit {
  @Input() typeSeance: any = null;

  selectedTypeSeance: string = '';
  volumeHoraireTotal: number | null = null;
  volumeHoraireSemaine: number | null = null;
  selectedCategorie: number | null = null;
  selectedMatiere: number | null = null;

  categories: any[] = [];
  matieres: any[] = [];
  typeSeanceOptions: { value: string; label: string }[] = [
    { value: 'TP', label: 'Travaux Pratiques' },
    { value: 'TD', label: 'Travaux Dirigés' },
    { value: 'Cours', label: 'Cours' },
  ]; // Les options compatibles avec le backend

  isEditMode: boolean = false;
  message: string = '';
  id: number | null = null;

  constructor(
    private typeSeanceService: TypeSceanceService,
    private categorieService: CategorieService,
    private matiereService: MatiereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.loadTypeSeance(this.id); // Charge les détails du type de séance
    }

    // Charger les catégories et matières pour le formulaire
    this.loadCategories();
    this.loadMatieres();
  }

  loadTypeSeance(id: number): void {
    this.typeSeanceService.getTypeSeanceById(id).subscribe({
      next: (typeSeance) => {
        this.selectedTypeSeance = typeSeance.type_seance;
        this.volumeHoraireTotal = typeSeance.volume_horaire_total;
        this.volumeHoraireSemaine = typeSeance.volume_horaire_semaine;
        this.selectedCategorie = typeSeance.categorie;
        this.selectedMatiere = typeSeance.matiere;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du type de séance', err);
        this.message = 'Impossible de charger le type de séance.';
      },
    });
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des catégories', err);
        this.message = 'Impossible de charger les catégories.';
      },
    });
  }

  loadMatieres(): void {
    this.matiereService.getMatieres().subscribe({
      next: (matieres) => {
        this.matieres = matieres;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des matières', err);
        this.message = 'Impossible de charger les matières.';
      },
    });
  }

  onSubmit(): void {
    if (
      this.selectedTypeSeance &&
      this.volumeHoraireTotal &&
      this.volumeHoraireSemaine &&
      this.selectedCategorie &&
      this.selectedMatiere
    ) {
      const typeSeanceData = {
        type_seance: this.selectedTypeSeance,
        volume_horaire_total: this.volumeHoraireTotal,
        volume_horaire_semaine: this.volumeHoraireSemaine,
        categorie: this.selectedCategorie,
        matiere: this.selectedMatiere,
      };

      if (this.isEditMode && this.id) {
        // Modifier un type de séance
        this.typeSeanceService
          .updateTypeSeance(this.id, typeSeanceData)
          .subscribe({
            next: () => {
              this.message = 'Type de séance modifié avec succès.';
              this.router.navigate(['/type_seance']);
            },
            error: (err) => {
              this.message = `Erreur lors de la modification : ${err.message}`;
            },
          });
      } else {
        // Ajouter un type de séance
        this.typeSeanceService.addTypeSeance(typeSeanceData).subscribe({
          next: () => {
            this.message = 'Type de séance ajouté avec succès.';
            this.router.navigate(['/type_seance']);
            this.resetForm();
          },
          error: (err) => {
            this.message = `Erreur lors de l\'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Tous les champs sont requis.';
    }
  }

  resetForm(): void {
    this.selectedTypeSeance = '';
    this.volumeHoraireTotal = null;
    this.volumeHoraireSemaine = null;
    this.selectedCategorie = null;
    this.selectedMatiere = null;
  }
}
