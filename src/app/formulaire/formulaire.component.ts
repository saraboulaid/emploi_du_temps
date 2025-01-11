import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FiliereService} from "../filiere.service";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
  imports: [
    FormsModule,
    JsonPipe,
   HttpClientModule
],
  standalone: true
})
export class FormulaireComponent {
  filiere = {
    nom: ''
  };

  response: any = null;


  constructor(private filiereService: FiliereService, private router: Router) {}


  submitForm() {

    this.filiereService.addFiliere(this.filiere).subscribe(
      (response: any) => {
        this.response = response;
        console.log('Filière ajoutée avec succès', response);

        this.router.navigate(['/dashbord/filiere']);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout de la filière', error);
      }
    );
   }
}
