import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatiereService } from '../matiere.service';
import { ProfService } from '../prof.service';
@Component({
  selector: 'app-assign-prof-form',
  templateUrl: './assign-prof-form.component.html',
  styleUrls: ['./assign-prof-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class AssignProfFormComponent implements OnInit {
  id: number | null = null;
  matieres: any = [];
  selectedMatieres: number[] = [];
  prof: any;

  constructor( private route: ActivatedRoute, private matiereService: MatiereService, private profService: ProfService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.matiereService.getMatieres().subscribe(
      (data) => {
        this.matieres = data; 
      },
      (error) => {
        console.error('Erreur lors de la récupération des matieres', error);
      }
    );  
    this.profService.getProfById(this.id!).subscribe(
      (data) => {
        this.prof = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du prof', error);
      }
    )
  }

    onSubmit() {
      console.log("Matières sélectionnées:", this.selectedMatieres);
      if (this.id != null) {
        this.profService.assignMatieres(this.id, this.selectedMatieres).subscribe({
          next: () => {
            console.log("Matières assignées avec succès");
            this.router.navigate([`/profs/${this.id}/matieres`]);
          },
          error: (err) => {
            console.error("Erreur lors de l'assignation des matières", err);
          }
        });
      }
    }
    
}