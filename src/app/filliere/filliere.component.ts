import { Component, OnInit } from '@angular/core';
import { FiliereService } from "../filiere.service";
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";  // Import du Router

@Component({
  selector: 'app-filliere',
  templateUrl: './filliere.component.html',
  styleUrls: ['./filliere.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class FilliereComponent implements OnInit {

   filieres: any[] = [];
  error: any | string = " ";
  message: string = '';
  constructor( private router: Router, private filiereService: FiliereService) {}  // Injection du Router


  ngOnInit(): void {
    this.filiereService.getFilieres().subscribe(
      (response) => {
        this.filieres = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des filières', error);
      }
    );
  }
  loadFilieres(): void {
    this.filiereService.getFilieres().subscribe({
      next: (filieres) => {
        this.filieres = filieres;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des filières', err);
        this.message = 'Impossible de charger les filières.';
      }
    });
  }

  navigateToForm(route: string) {
    const url = `/filiere/${route}`;
    console.log('Navigating to: ', url);
    this.router.navigate([url]);
  }
  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette filière ?')) {
      this.filiereService.deleteFiliere(id).subscribe({
        next: () => {
          this.message = 'Filière supprimée avec succès.';
          this.loadFilieres(); // Recharger la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la filière', err);
          this.message = `Erreur lors de la suppression : ${err.message}`;
        }
      });
    }
  }


}
