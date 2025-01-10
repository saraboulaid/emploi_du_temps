import { Component } from '@angular/core';

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
    { name: 'Filiere', route: '/crud-table/Filiere', icon: 'school-outline' },
    { name: 'Profs', route: '/crud-table/Profs', icon: 'person-outline' },
    { name: 'Matieres', route: '/crud-table/Matieres', icon: 'book-outline' },
    { name: 'Salles', route: '/crud-table/Salles', icon: 'grid-outline' },
    { name: 'Duration', route: '/crud-table/Duration', icon: 'time-outline' },
  ];

  activeItem = this.menuItems[0]; // Élément actif par défaut

  setActiveItem(item: any) {
    // Active l'élément cliqué
    this.activeItem = item;
  }
}
