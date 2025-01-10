import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showSidebar: boolean = true;

  constructor(private router: Router) {
    // Détecte les changements de route
    this.router.events.subscribe(() => {
      // Vérifie si la route active est '/auth'
      this.showSidebar = this.router.url !== '/auth';
    });
  }
}
