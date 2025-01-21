import { Component, Input, OnInit } from '@angular/core';
import { ProfService } from '../prof.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-prof',
  templateUrl: './form-prof.component.html',
  styleUrls: ['./form-prof.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class FormProfComponent implements OnInit {
  @Input() prof: any = null; // Professeur passé pour édition
  id: number | null = null; // ID du professeur pour l'édition
  nom: string = ''; // Nom du professeur saisi
  prenom: string = ''; // Prénom du professeur saisi
  isEditMode: boolean = false; // Détermine le mode : ajout ou édition
  message: string = ''; // Message de feedback utilisateur

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private profService: ProfService
  ) {}

  ngOnInit(): void {
    // Vérifie si un ID est passé dans les paramètres de la route
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.id = +idParam; // Convertit l'ID en nombre
        this.loadProfById(this.id); // Charge les données du professeur
      } else if (this.prof) {
        // Si un professeur est passé via @Input
        this.isEditMode = true;
        this.id = this.prof.id;
        this.nom = this.prof.nom;
        this.prenom = this.prof.prenom;
      }
    });
  }

  // Charge les données du professeur par son ID
  loadProfById(id: number): void {
    this.profService.getProfById(id).subscribe(
      (prof) => {
        this.nom = prof.nom;
        this.prenom = prof.prenom;
      },
      (error) => {
        console.error(
          'Erreur lors du chargement des données du professeur',
          error
        );
        this.message = 'Erreur lors de la récupération des données.';
      }
    );
  }

  // Soumet le formulaire
  onSubmit(): void {
    if (this.isEditMode) {
      // Vérifie que l'ID est défini
      if (!this.id) {
        this.message =
          "L'ID du professeur est introuvable pour la mise à jour.";
        return;
      }

      // Mise à jour du professeur
      this.profService
        .updateProf(this.id, { nom: this.nom, prenom: this.prenom })
        .subscribe(
          () => {
            this.message = 'Professeur modifié avec succès.';
            this.router.navigate(['/profs']); // Redirection vers /profs
          },
          (error) => {
            console.error(
              'Erreur lors de la modification du professeur',
              error
            );
            this.message = 'Une erreur est survenue lors de la modification.';
          }
        );
    } else {
      // Ajout d'un nouveau professeur
      this.profService
        .addProf({ nom: this.nom, prenom: this.prenom })
        .subscribe(
          () => {
            this.message = 'Professeur ajouté avec succès.';
            this.router.navigate(['/profs']); // Redirection vers /profs
          },
          (error) => {
            console.error("Erreur lors de l'ajout du professeur", error);
            this.message = "Une erreur est survenue lors de l'ajout.";
          }
        );
    }
  }
}
