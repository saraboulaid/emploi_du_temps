import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatiereService } from '../matiere.service'; // Service pour gérer les matières
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class MatieresComponent implements OnInit {
  matieres: any[] = []; // Liste des matières
  error: any | string = ''; // Gestion des erreurs

  constructor(private router: Router, private matiereService: MatiereService) {}

  ngOnInit(): void {
    // Récupération des données des matières au chargement du composant
    this.matiereService.getMatieres().subscribe(
      (response) => {
        this.matieres = response.map((matiere) => ({
          ...matiere,
          filiere: matiere.filiere,
          semestres: matiere.semestres,
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des matières', error);
        this.error =
          "Une erreur s'est produite lors du chargement des données.";
      }
    );
  }

  navigateToForm(route: string) {
    const url = `/matieres/${route}`;
    console.log('Navigating to:', url);
    this.router.navigate([url]);
  }

  deleteMatiere(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      this.matiereService.deleteMatiere(id).subscribe(
        () => {
          this.matieres = this.matieres.filter((matiere) => matiere.id !== id); // Mise à jour locale après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la matière', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
}
