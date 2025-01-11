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
      case 'Mi-Semestre':
        return ['S1', 'S2', 'S3', 'S4'];
      case 'Responsable':
        if (this.name === 'Profs') {
          return this.tableData.map((prof) => prof.Nom + ' ' + prof.Prenom);
        }
        return ['Responsable 1', 'Responsable 2'];
      case 'Type Séance':
        return ['Equip IT', 'Equip Indus', 'Equip Energetique'];
      case 'Matière':
        return ['Informatique', 'Mathématiques', 'Physique'];
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
          this.tableColumns = ['ID', 'Nom', 'Prénom', 'Actions'];
          this.tableData = [
            { id: 1, Nom: 'Ali', Prenom: 'Bouzid' },
            { id: 2, Nom: 'Sara', Prenom: 'Boulaid' },
            { id: 3, Nom: 'Hicham', Prenom: 'Boulaid' },
          ];
          this.fieldTypes = {
            Nom: { type: 'input', inputType: 'text' },
            Prénom: { type: 'input', inputType: 'text' },
          };
          break;

        case 'Matieres':
          this.tableColumns = ['ID', 'Nom', 'Mi-Semestre', 'Actions'];
          this.tableData = [
            {
              id: 1,
              Nom: 'Mathématiques',
              'Mi-Semestre': 'S1',
            },
            {
              id: 2,
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
          this.tableColumns = [
            'ID',
            'Nom',
            'Effectif',
            'Classification',
            'Actions',
          ];
          this.tableData = [
            { id: 1, Nom: 'Salle A', Effectif: 30, Classification: 'IT' },
            { id: 2, Nom: 'Salle B', Effectif: 20, Classification: 'Indus' },
          ];
          this.fieldTypes = {
            Nom: { type: 'input', inputType: 'text' },
            Effectif: { type: 'input', inputType: 'number' },
            Classification: { type: 'select' },
          };
          break;

        case 'Duration':
          this.tableColumns = [
            'ID',
            'Jour',
            'Horaire de début',
            'Horaire de fin',
            'Actions',
          ];
          this.tableData = [
            {
              id: 1,
              Jour: 'Lundi',
              'Horaire de début': '08:00',
              'Horaire de fin': '10:00',
            },
            {
              id: 2,
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
            'ID',
            'Type Séance',
            'Volume horaire total',
            'Volume horaire par semaine',
            'Catégorie',
            'Matière',
            'Actions',
          ];
          this.tableData = [
            {
              id: 1,
              'Type Séance': 'TP',
              'Volume horaire total': 33,
              'Volume horaire par semaine': 12,
              Catégorie: 'Equipement IT',
              Matière: 'C++',
            },
            {
              id: 2,
              'Type Séance': 'TD',
              'Volume horaire total': 44,
              'Volume horaire par semaine': 10,
              Catégorie: 'Equipement Industriel',
              Matière: 'MSProject',
            },
          ];
          this.fieldTypes = {
            'Type Séance': { type: 'select' },
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
          this.tableColumns = ['ID', 'Nom Filiere', 'Responsable', 'Actions'];
          this.tableData = [
            { id: 1, 'Nom Filiere': 'Informatique', Responsable: 'M. Karim' },
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
  filterKeys(data: any): string[] {
    return this.getObjectKeys(data).filter((key) => key.toLowerCase() !== 'id');
  }
}
