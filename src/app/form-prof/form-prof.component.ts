import { Component, Input, OnInit } from '@angular/core';
import { ProfService } from '../prof.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-prof',
  templateUrl: './form-prof.component.html',
  styleUrls: ['./form-prof.component.css'],
  imports: [FormsModule],
  standalone: true,
})
export class FormProfComponent implements OnInit {
  @Input() prof: any = null; // Professeur passé pour édition
  nomProf: string = ''; // Nom du professeur saisi
  prenomProf: string = ''; // Prénom du professeur saisi
  isEditMode: boolean = false; // Détermine le mode : ajout ou édition
  message: string = ''; // Message de feedback utilisateur

  constructor(private profService: ProfService) {}

  ngOnInit(): void {
    // Si un professeur est passé, on est en mode édition
    if (this.prof) {
      this.isEditMode = true;
      this.nomProf = this.prof.nomProf;
      this.prenomProf = this.prof.prenomProf;
    }
  }

  onSubmit(): void {
    if (this.nomProf.trim() && this.prenomProf.trim()) {
      if (this.isEditMode && this.prof?.id) {
        // Modification d'un professeur existant
        this.profService.updateProf(this.prof.id, { nomProf: this.nomProf, prenomProf: this.prenomProf }).subscribe({
          next: () => {
            this.message = 'Professeur modifié avec succès.';
          },
          error: (err) => {
            this.message = `Erreur lors de la modification : ${err.message}`;
          },
        });
      } else {
        // Ajout d'un nouveau professeur
        this.profService.addProf({ nomProf: this.nomProf, prenomProf: this.prenomProf }).subscribe({
          next: () => {
            this.message = 'Professeur ajouté avec succès.';
            this.nomProf = ''; // Réinitialisation du champ
            this.prenomProf = ''; // Réinitialisation du champ
          },
          error: (err) => {
            this.message = `Erreur lors de l'ajout : ${err.message}`;
          },
        });
      }
    } else {
      this.message = 'Le nom et le prénom du professeur sont requis.';
    }
  }
}
