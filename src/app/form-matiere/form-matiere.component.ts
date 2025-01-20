import { Component, Input, OnInit } from '@angular/core';
import { MatiereService } from '../matiere.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-matiere',
  templateUrl: './form-matiere.component.html',
  styleUrls: ['./form-matiere.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class FormMatiereComponent implements OnInit {
  @Input() matiere: any = null; // Matière passée pour édition
  nomMatiere: string = ''; // Nom de la matière saisi
  isEditMode: boolean = false; // Détermine le mode : ajout ou édition
  message: string = ''; // Message de feedback utilisateur
  id: number| null = null;

  constructor(private matiereService: MatiereService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.loadMatiere(Number(this.id));    }
  }
  loadMatiere(id: number): void {
    this.matiereService.getMatiereById(id).subscribe({
      next: (matiere) => {
        this.nomMatiere = matiere.nom;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la matière', err);
        this.message = 'Impossible de charger la matière.';
      },
    });
  }

  onSubmit(): void {
    if (this.nomMatiere.trim()) {
      if (this.isEditMode && this.id) {
        // Modification d'une matière existante
        this.matiereService.updateMatiere(this.id, { nom: this.nomMatiere }).subscribe({
          next: () => {
            this.message = 'Matière modifiée avec succès.';
            this.router.navigate(['/matiere']);
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'une nouvelle matière
        this.matiereService.addMatiere({ nom: this.nomMatiere }).subscribe({
          next: () => {
            this.message = 'Matière ajoutée avec succès.';
            this.router.navigate(['/matiere']);
            this.nomMatiere = ''; // Réinitialisation du champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom de la matière est requis.';
    }
  }
}
