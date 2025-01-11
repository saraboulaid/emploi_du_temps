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
  isCreateFormHidden = true;
  isFilterDropdownHidden = true;
  isCrudActivatedHidden = true;

  tableProfs = [
    { Nom: 'Ali', Prenom: 'Bouzid' },
    { Nom: 'Sara', Prenom: 'Boulaid' },
    { Nom: 'Hicham', Prenom: 'Boulaid' },
  ];

  fieldTypes: {
    [key: string]: {
      type: 'input' | 'select';
      inputType?: 'text' | 'number' | 'time';
    };
  } = {};

  // Options pour les colonnes
  getOptionsForColumn(column: string): string[] {
    switch (column) {
      case 'Jour':
        return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
      case 'Classification':
        return ['IT', 'Indus', 'Robotique'];
      default:
        return [];
    }
  }

  toggleDropdown() {
    this.isDropdownHidden = !this.isDropdownHidden;
  }

  toggleCrudActivatedHidden() {
    this.isCrudActivatedHidden = !this.isCrudActivatedHidden;
  }

  toggleFilterDropdown() {
    this.isFilterDropdownHidden = !this.isFilterDropdownHidden;
  }

  toggleCreateForm() {
    this.isCreateFormHidden = !this.isCreateFormHidden;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('name');

      // Définir les colonnes, les données et les types de champs selon le paramètre "name"
      switch (this.name) {
        case 'Profs':
          this.tableColumns = ['Nom', 'Prénom', 'Actions'];
          this.tableData = [
            { Nom: 'Ali', Prenom: 'Bouzid' },
            { Nom: 'Sara', Prenom: 'Boulaid' },
            { Nom: 'Sara', Prenom: 'Boulaid' },
            { Nom: 'Sara', Prenom: 'Boulaid' },
          ];
          this.fieldTypes = {
            Nom: { type: 'input', inputType: 'text' },
            Prénom: { type: 'input', inputType: 'text' },
          };
          break;

        case 'Matieres':
          this.tableColumns = ['Nom', 'Mi-Semestre', 'Actions'];
          this.tableData = [
            {
              Nom: 'Mathématiques',
              'Mi-Semestre': 'S1',
            },
            {
              Nom: 'Informatique',
              'Mi-Semestre': 'S2',
            },
          ];
          this.fieldTypes = {
            Nom: { type: 'input', inputType: 'text' },
            'Mi-Semestre': { type: 'select' },
          };
          break;

        case 'Salles':
          this.tableColumns = ['Nom', 'Effectif', 'Classification', 'Actions'];
          this.tableData = [
            { Nom: 'Salle A', Effectif: 30, Classification: 'IT' },
            { Nom: 'Salle B', Effectif: 20, Classification: 'Indus' },
          ];
          this.fieldTypes = {
            Nom: { type: 'input', inputType: 'text' },
            Effectif: { type: 'input', inputType: 'number' },
            Classification: { type: 'select' },
          };
          break;

        case 'Duration':
          this.tableColumns = [
            'Jour',
            'Horaire de début',
            'Horaire de fin',
            'Actions',
          ];
          this.tableData = [
            {
              Jour: 'Lundi',
              'Horaire de début': '08:00',
              'Horaire de fin': '10:00',
            },
            {
              Jour: 'Mardi',
              'Horaire de début': '10:00',
              'Horaire de fin': '12:00',
            },
          ];
          this.fieldTypes = {
            Jour: { type: 'select' },
            'Horaire de début': { type: 'input', inputType: 'time' },
            'Horaire de fin': { type: 'input', inputType: 'time' },
          };
          break;

        case 'Type Séance':
          this.tableColumns = [
            'Type Séance',
            'Volume horaire total',
            'Volume horaire par semaine',
            'Catégorie',
            'Matière',
            'Actions',
          ];
          this.tableData = [
            {
              'Type Séance': 'TP',
              'Volume horaire total': 33,
              'Volume horaire par semaine': 12,
              Catégorie: 'Equipement IT',
              Matière: 'C++',
            },
            {
              'Type Séance': 'TD',
              'Volume horaire total': 44,
              'Volume horaire par semaine': 10,
              Catégorie: 'Equipement Industriel',
              Matière: 'MSProject',
            },
          ];
          this.fieldTypes = {
            'Type Séance': { type: 'select' },
            'Mi-Semestre': { type: 'select' },
            'Volume horaire total': { type: 'input', inputType: 'number' },
            'Volume horaire par semaine': {
              type: 'input',
              inputType: 'number',
            },
            Catégorie: { type: 'select' },
            Matière: { type: 'select' },
          };
          break;

        case 'Filiere':
          this.tableColumns = ['Nom Filiere', 'Responsable', 'Actions'];
          this.tableData = [
            { 'Nom Filiere': 'Informatique', Responsable: 'M. Karim' },
          ];
          this.fieldTypes = {
            'Nom Filiere': { type: 'input', inputType: 'text' },
            Responsable: { type: 'select' },
          };
          break;

        // Ajouter d'autres cas pour d'autres éléments
        default:
          this.tableColumns = [];
          this.tableData = [];
          this.fieldTypes = {};
          break;
      }
    });
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
