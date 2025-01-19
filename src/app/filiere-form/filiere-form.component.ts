import { Component, Input, OnInit } from '@angular/core';
import { FiliereService } from '../filiere.service';
import {FormsModule} from "@angular/forms";

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

  constructor(private filiereService: FiliereService) {}

  ngOnInit(): void {
    // Si une filière est passée en entrée, on est en mode édition
    if (this.filiere) {
      this.isEditMode = true;
      this.nomFiliere = this.filiere.nomFiliere;
    }
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
        this.filiereService.addFiliere({ nomFiliere: this.nomFiliere }).subscribe({
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
