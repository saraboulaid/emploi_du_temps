import { Component, Input, OnInit } from '@angular/core';
import { FiliereService } from '../filiere.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html',
  styleUrls: ['./filiere-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FiliereFormComponent implements OnInit {
  @Input() filiere: any = null;
  nomFiliere: string = '';
  isEditMode: boolean = false;
  message: string = '';
  id: number | null = null;
  constructor(
    private filiereService: FiliereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.loadFiliere(Number(this.id)); // Charge les détails de la filière
    }
  }
  loadFiliere(id: number): void {
    this.filiereService.getFiliereById(id).subscribe({
      next: (filiere) => {
        this.nomFiliere = filiere.nom; // Remplir le champ nomFiliere avec la donnée récupérée
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la filière', err);
        this.message = 'Impossible de charger la filière.';
      },
    });
  }

  onSubmit(): void {
    if (this.nomFiliere.trim()) {
      if (this.isEditMode && this.id) {
        // Appel au service pour la modification
        this.filiereService
          .updateFiliere(this.id, { nom: this.nomFiliere })
          .subscribe({
            next: () => {
              this.message = 'Filière modifiée avec succès.';
              this.router.navigate(['/filiere']);
            },
            error: (err) => {
              this.message = `Erreur lors de la modification : ${err.message}`;
            },
          });
      } else {
        // Appel au service pour l'ajout
        this.filiereService.addFiliere({ nom: this.nomFiliere }).subscribe({
          next: () => {
            this.message = 'Filière ajoutée avec succès.';
            this.router.navigate(['filiere']);
            this.nomFiliere = ''; // Réinitialiser le champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom de la filière est requis.';
    }
  }
}
