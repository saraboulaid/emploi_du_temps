import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";  // Import du Router
import { ProfService } from '../prof.service';
import { FiliereService } from '../filiere.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-prof-matieres',
  templateUrl: './prof-matieres.component.html',
  styleUrls: ['./prof-matieres.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProfMatieresComponent implements OnInit {
  matieres: any[] = [];
  id: number | null = null;
  prof: any;
  constructor( private route: ActivatedRoute, private profService: ProfService, private filiereService: FiliereService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.loadData(this.id);
    }
  }

  private loadData(id: number): void {
    forkJoin({
      matieres: this.profService.getMatieres(id),
      prof: this.profService.getProfById(id)
    }).subscribe(({ matieres, prof }) => {
      this.prof = prof;
      
      this.matieres = matieres.map(matiere => ({
        ...matiere,
        filiereNom: ''
      }));
  
      const filiereObservables = this.matieres
        .filter(matiere => matiere.filiere)
        .map(matiere => this.filiereService.getFiliereById(matiere.filiere).pipe(
          switchMap(filiere => {
            matiere.filiereNom = filiere.nom;
            return [matiere]; 
          })
        ));
  
      forkJoin(filiereObservables).subscribe(updatedMatieres => {
        this.matieres = updatedMatieres; 
      });
  
    }, error => {
      console.error('Erreur lors du chargement des données', error);
    });
  }
  

  assignMatiere(id: number){
    this.router.navigate([`/assign-matiere/${id}`]);
  }

  desafecterMatiere(id: number){
    console.log("desafecter"+ id);
  }
}
