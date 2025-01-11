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

  constructor(private filiereService: FiliereService, private router: Router) {}  // Injection du Router

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

  navigateToForm(route: string) {
    const url = `/dashbord/filiere/${route}`;
    console.log('Navigating to: ', url);
    this.router.navigate([url]);
  }

}
