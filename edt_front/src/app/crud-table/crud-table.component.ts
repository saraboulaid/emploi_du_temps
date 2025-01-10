import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.css'],
})
export class CrudTableComponent implements OnInit {
  tableColumns: string[] = [];
  tableData: any[] = [];
  name: string | null = null; // Propriété pour stocker le paramètre
  isDropdownHidden = true;
  // Variable pour contrôler l'affichage du formulaire de création
  isCreateFormHidden = true;
  isFilterDropdownHidden = true;
  isCrudActivatedHidden = true;

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }
  toggleCrudActivatedHidden() {
    this.isCrudActivatedHidden = !this.isCrudActivatedHidden;
  }
  toggleFilterDropdown() {
    this.isFilterDropdownHidden = !this.isFilterDropdownHidden;
  }
  // Fonction pour basculer l'affichage du formulaire
  toggleCreateForm() {
    console.log('Toggling create form');
    this.isCreateFormHidden = !this.isCreateFormHidden;
    console.log('isCreateFormHidden:', this.isCreateFormHidden);
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('name');

      // Définir les colonnes et données selon le paramètre "name"
      switch (this.name) {
        case 'Profs':
          this.tableColumns = ['Nom', 'Prénom'];
          this.tableData = [
            { Nom: 'Ali', Prénom: 'Bouzid' },
            { Nom: 'Sara', Prénom: 'Boulaid' },
          ];
          break;
        case 'Filiere':
          this.tableColumns = ['Nom Filiere', 'Responsable'];
          this.tableData = [
            { 'Nom Filiere': 'Informatique', Responsable: 'M. Karim' },
          ];
          break;
        // Ajoutez d'autres cas pour les autres éléments
        default:
          this.tableColumns = [];
          this.tableData = [];
          break;
      }
    });
  }
  // Méthode pour retourner les clés d'un objet
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
