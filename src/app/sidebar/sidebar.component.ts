import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Assure-toi que le chemin est correct
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  // Données dynamiques pour le menu
  // menuItems = [
  //   { name: 'Filiere', icon: 'home-outline' },
  //   { name: 'Profs', icon: 'chatbubbles-outline' },
  //   { name: 'Matieres', icon: 'folder-outline' },
  //   { name: 'Salles', icon: 'pie-chart-outline' },
  //   { name: 'Duration', icon: 'pie-chart-outline' },
  //   // {
  //   //   name: 'Team',
  //   //   icon: 'people-outline',
  //   //   submenu: [
  //   //     { name: 'User', icon: 'person-outline' },
  //   //     { name: 'Group', icon: 'people-outline' },
  //   //     { name: 'Members', icon: 'person-add-outline' },
  //   //   ],
  //   // },
  //   { name: 'Settings', icon: 'settings-outline' },
  // ];

  menuItems = [
    { name: 'Filiere', route: 'filiere', icon: 'school-outline' },
    { name: 'Profs', route: 'profs', icon: 'person-outline' },
    { name: 'Matieres', route: 'matieres', icon: 'book-outline' },
    {
      name: 'Type Séance',
      route: 'type_seance',
      icon: 'construct-outline',
    },
    { name: 'Salles', route: 'salles', icon: 'grid-outline' },
    { name: 'Duration', route: 'duration', icon: 'time-outline' },
    {
      name: 'Emploi du Temps',
      route: '/emploi-du-temps',
      icon: 'calendar-outline',
    },
    {
      name: 'Déconnexion',
      route: '/',
      icon: 'log-out-outline',
      action: () => this.logout(), // Appel de la méthode logout lors du clic
    },
  ];
authenticated: boolean = false;
  activeItem = this.menuItems[0];
  constructor(private authService: AuthService, private router: Router) {}// Élément actif par défaut
  logout() {
    this.authService.logout();
    this.authenticated = false;
    this.router.navigate(['/']);

   // Appel du service pour se déconnecter
  }
  setActiveItem(item: any) {
    // Active l'élément cliqué
    this.activeItem = item;
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();

  }
}
