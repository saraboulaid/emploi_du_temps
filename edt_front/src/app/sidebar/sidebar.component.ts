import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  // Données dynamiques pour le menu
  menuItems = [
    { name: 'Filiere', icon: 'home-outline' },
    { name: 'Profs', icon: 'chatbubbles-outline' },
    { name: 'Matieres', icon: 'folder-outline' },
    { name: 'Salles', icon: 'pie-chart-outline' },
    { name: 'Duration', icon: 'pie-chart-outline' },
    // {
    //   name: 'Team',
    //   icon: 'people-outline',
    //   submenu: [
    //     { name: 'User', icon: 'person-outline' },
    //     { name: 'Group', icon: 'people-outline' },
    //     { name: 'Members', icon: 'person-add-outline' },
    //   ],
    // },
    { name: 'Settings', icon: 'settings-outline' },
  ];

  activeItem = this.menuItems[0]; // Élément actif par défaut

  setActiveItem(item: any) {
    // Active l'élément cliqué
    this.activeItem = item;
  }
}
