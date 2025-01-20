import { Component, Input, OnInit } from '@angular/core';
import { MatiereService } from '../matiere.service';
import { FiliereService } from '../filiere.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-matiere',
  templateUrl: './form-matiere.component.html',
  styleUrls: ['./form-matiere.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormMatiereComponent implements OnInit {
  @Input() matiere: any = null;
  nomMatiere: string = '';
  selectedFiliere: number | null = null; 
  selectedSemestres: number[] = [];
  filieres: any[] = [];
  semestres: any[] = [];
  isEditMode: boolean = false;
  message: string = '';
  id: number| null = null;

  constructor(private matiereService: MatiereService, private filiereService: FiliereService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.loadMatiere(Number(this.id));    
    }
    this.loadFilieres();
    this.loadSemestres();
  }

  loadMatiere(id: number): void {
    this.matiereService.getMatiereById(id).subscribe({
      next: (matiere) => {
        this.nomMatiere = matiere.nom;
        this.selectedFiliere = matiere.filiere;
        this.selectedSemestres = matiere.semestres.map((s: any) => s.id);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la matière', err);
        this.message = 'Impossible de charger la matière.';
      },
    });
  }

  loadFilieres(): void {
    this.filiereService.getFilieres().subscribe({
      next: (filieres) => {
        this.filieres = filieres;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des filières', err);
      },
    });
  }

  loadSemestres(): void {
    this.semestres = [
      { id: 1, numero: 'S1' },
      { id: 2, numero: 'S2' },
      { id: 3, numero: 'S3' },
      { id: 4, numero: 'S4' },
    ];
  }

  onSubmit(): void {
    if (this.nomMatiere.trim() && this.selectedFiliere && this.selectedSemestres.length) {
      const payload = {
        nom: this.nomMatiere,
        filiere: this.selectedFiliere,
        semestres: this.selectedSemestres,
      };

      if (this.isEditMode && this.id) {
        // Modification d'une matière existante
        this.matiereService.updateMatiere(this.id, payload).subscribe({
          next: () => {
            this.message = 'Matière modifiée avec succès.';
            this.router.navigate(['/matieres']);
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle matière
        this.matiereService.addMatiere(payload).subscribe({
          next: () => {
            this.message = 'Matière ajoutée avec succès.';
            this.router.navigate(['/matieres']);
            this.nomMatiere = '';
            this.selectedFiliere = null;
            this.selectedSemestres = [];
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Tous les champs sont requis.';
    }
  }
}
