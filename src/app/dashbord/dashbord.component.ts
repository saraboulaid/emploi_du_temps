import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation du module commun pour les directives comme ngIf, ngFor, etc.
import { Router, RouterModule } from '@angular/router'; // Importation du Router

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashbordComponent {
  constructor(private router: Router) {}


  navigateToFiliere(route: string) {
    this.router.navigate([`/dashbord/${route}`]);
  }
}
