import { Component, Input, OnInit } from '@angular/core';
import { FiliereService } from '../filiere.service';
import {FormsModule} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html',
  styleUrls: ['./filiere-form.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class FiliereFormComponent implements OnInit {
  @Input() filiere: any = null;
  nomFiliere: string = '';
  isEditMode: boolean = false;
  message: string = '';

  constructor(
    private filiereService: FiliereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadFiliere(Number(id)); // Charge les détails de la filière
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
      if (this.isEditMode && this.filiere?.id) {
        // Appel au service pour la modification
        this.filiereService.updateFiliere(this.filiere.id, { nomFiliere: this.nomFiliere }).subscribe({
          next: () => {
            this.message = 'Filière modifiée avec succès.';
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
