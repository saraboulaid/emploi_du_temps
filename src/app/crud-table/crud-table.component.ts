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
