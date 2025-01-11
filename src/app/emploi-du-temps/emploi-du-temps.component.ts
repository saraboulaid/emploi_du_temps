import { Component } from '@angular/core';
import {Router} from '@angular/router';
interface Filiere {
  nom: string;
  annee: string;
  semestre: string;
  photo: string;
}

@Component({
  selector: 'app-emploi-du-temps',
  templateUrl: './emploi-du-temps.component.html',
  styleUrls: ['./emploi-du-temps.component.css']
})

export class EmploiDuTempsComponent {
  isScheduleBoxVisible: boolean = false;

  constructor(private router: Router) {}
  // Données des filières
  filieres: Filiere[] = [
    { nom: 'GINF3', annee: '2024', semestre: 'S11', photo: 'assets/images/edt.png' },
    { nom: 'G3EI3', annee: '2024', semestre: 'S2', photo: 'assets/images/calendrier.jpg' },
    { nom: 'GIND3', annee: '2024', semestre: 'S3', photo: 'assets/images/calendrier.jpg' },
    { nom: 'GINF3', annee: '2024', semestre: 'S11', photo: 'assets/images/calendrier.jpg' },
    { nom: 'G3EI3', annee: '2024', semestre: 'S2', photo: 'assets/images/calendrier.jpg' },
    { nom: 'GIND3', annee: '2024', semestre: 'S3', photo: 'assets/images/calendrier.jpg' },
    { nom: 'GINF3', annee: '2024', semestre: 'S11', photo: 'assets/images/calendrier.jpg' },
    { nom: 'G3EI3', annee: '2024', semestre: 'S2', photo: 'assets/images/calendrier.jpg' },
    { nom: 'GIND3', annee: '2024', semestre: 'S3', photo: 'assets/images/calendrier.jpg' }
  ];

  // Colonnes à afficher
  displayedColumns: string[] = ['nom', 'annee', 'semestre', 'actions'];

  // Gestion de la pagination
  paginatedFilieres: Filiere[] = [];
  pageSize = 5;
  pageIndex = 0;

  // Gestion du filtrage
  searchQuery: string = '';
  filieresFiltered: Filiere[] = [...this.filieres];

  // Gestion de la modal
  selectedFiliere: Filiere | null = null;

  ngOnInit() {
    this.paginate();
  }

  // Fonction pour gérer la pagination
  paginate() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedFilieres = this.filieresFiltered.slice(startIndex, endIndex);

    // Réinitialiser la page à 0 si aucune donnée n'est affichée sur la page actuelle
    if (this.paginatedFilieres.length === 0 && this.pageIndex > 0) {
      this.pageIndex = 0;
      this.paginate(); // Recalcule la pagination
    }
  }


  // Mise à jour lors d'un changement de page
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginate();
  }

  // Voir les détails d'une filière
  viewDetails(filiere: Filiere) {
    this.selectedFiliere = filiere;
  }

  // Fermer la modal
  closeModal() {
    this.selectedFiliere = null;
  }

  // Supprimer une filière
  deleteFiliere(filiere: Filiere) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${filiere.nom} ?`)) {
      // Supprimer de la liste des filières
      this.filieres = this.filieres.filter(f => f !== filiere);
      // Filtrer à nouveau les données
      this.filterFilieres();
      this.paginate(); // Mettre à jour la pagination
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterFilieres(); // Refiltre les données avec une chaîne vide
  }

  // Filtrer les filières
  filterFilieres() {
    const query = this.searchQuery.toLowerCase();
    this.filieresFiltered = this.filieres.filter(filiere =>
      filiere.nom.toLowerCase().includes(query) ||
      filiere.annee.toLowerCase().includes(query) ||
      filiere.semestre.toLowerCase().includes(query)
    );
    // Après avoir filtré, appliquez la pagination
    this.paginate();
  }


  // Modifier une filière
  // editFiliere(filiere: any): void {
  //   const filiereNom = filiere.nom; // Récupérez le nom de la filière
  //   this.router.navigate(['/schedule-form'], { state: { filiereNom } });
  // }
  editFiliere(filiere: any): void {
    this.selectedFiliere = filiere; // Définir la filière sélectionnée
    this.isScheduleBoxVisible = true;
  // Afficher le box
  }

  // Fermer le box
  closeScheduleBox(): void {
    this.isScheduleBoxVisible = false;
    this.selectedFiliere = null; // Réinitialiser la filière sélectionnée
  }
  // Télécharger une filière
  downloadFiliere(filiere: Filiere) {
    console.log('Télécharger la filière :', filiere);
    // Ajouter la logique de téléchargement
  }

}
