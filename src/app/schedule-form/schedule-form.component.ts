import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {
  @Input() filiere: any; // Recevoir la filière via @Input

  scheduleForm!: FormGroup;
  profs: string[] = ['Prof 1', 'Prof 2', 'Prof 3'];
  salles: string[] = ['Salle 1', 'Salle 2', 'Salle 3'];
  jours: string[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  durees: string[] = ['9:00-10:30', '11:00-12:30', '13:30-15:00', '15:30-17:00'];

  constructor(private fb: FormBuilder, private router: Router) { // Injection du Router
    this.scheduleForm = this.fb.group({
      filiere: [''],
      prof: [''],
      salle: [''],
      jour: [''],
      duree: [[]],
    });
  }
  closeForm() {
    // Réinitialise le formulaire
    this.scheduleForm.reset();
  
    // Redirection vers la page emploi-du-temps
    this.router.navigate(['/emploi-du-temps']);
  }
  ngOnInit(): void {
    // Utiliser l'input filiere au lieu de history.state
    const filiereNom = this.filiere?.nom || ''; // Filtrer le nom de la filière

    // Initialiser le formulaire
    this.scheduleForm = this.fb.group({
      filiere: [filiereNom, Validators.required],
      prof: ['', Validators.required],
      salle: ['', Validators.required],
      jour: ['', Validators.required],
      duree: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      console.log('Formulaire soumis avec succès :', this.scheduleForm.value);
    }
  }
}
