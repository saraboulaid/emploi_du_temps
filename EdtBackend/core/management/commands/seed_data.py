from django.core.management.base import BaseCommand
from core.models import Duration, Semestre, Filiere, Categorie, Matiere, TypeSeance, Prof, Prof_TypeSeance, Salle, Type 
import random

class Command(BaseCommand):
    help = "Seed data for all models in the database"

    def handle(self, *args, **kwargs):
        try:
            self.stdout.write(self.style.NOTICE("Starting the seeding process..."))

            self.seed_durations()
            self.seed_semestres()
            self.seed_filieres()
            self.seed_categories()
            self.seed_matieres()
            self.seed_profs()
            self.seed_type_seances()
            self.seed_prof_type_seances()
            self.seed_salles()

            self.stdout.write(self.style.SUCCESS("All models seeded successfully!"))
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"An error occurred: {str(e)}"))

    def seed_durations(self):
        jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
        horaires = [
            ('09:00:00', '10:30:00'),
            ('11:00:00', '12:30:00'),
            ('13:30:00', '15:00:00'),
            ('15:30:00', '17:00:00')
        ]

        for jour in jours:
            for horaire_debut, horaire_fin in horaires:
                Duration.objects.get_or_create(
                    jour=jour,
                    horaire_debut_seance=horaire_debut,
                    horaire_fin_seance=horaire_fin
                )

    def seed_semestres(self):
        semestres = ['S1', 'S2', 'S3', 'S4']
        for semestre in semestres:
            Semestre.objects.get_or_create(numero=semestre)

    def seed_filieres(self):
        filieres = ['AP1', 'AP2', 'GINF', 'GIND', 'G3EI', 'GSTR', 'GSEA']
        for filiere in filieres:
            Filiere.objects.get_or_create(nom=filiere)

    def seed_categories(self):
        categories = ['Industrielle', 'Informatique', 'Chimie', 'Générale']
        for categorie in categories:
            Categorie.objects.get_or_create(nom=categorie)

    def seed_matieres(self):
        matieres = [
            {'id': 1, 'nom': 'Algèbre 1', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 2, 'nom': 'Analyse 1', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 3, 'nom': 'Mécanique du Point Matériel', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 4, 'nom': 'Chimie Génerale', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 5, 'nom': 'Dessin Technique', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 6, 'nom': 'Langues Étrangères', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 7, 'nom': 'Méthodologie de Travail Universitaire', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 8, 'nom': 'Analyse 2', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 9, 'nom': 'Algèbre 2', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 10, 'nom': 'Électrostatique et Magnétostatique', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 11, 'nom': 'Thermodynamique Statique des Fluides', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 12, 'nom': 'Algorithmique', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 13, 'nom': 'Français 2 et Anglais 2', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 14, 'nom': 'Culture Digitale', 'filiere_id': 1, 'semestres': ['S1', 'S2']},
            {'id': 15, 'nom': 'Analyse 3', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 16, 'nom': 'Algèbre 3', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 17, 'nom': 'Mécanique du Solide', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 18, 'nom': 'Électrocinétique 1 & 2', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 19, 'nom': 'Langage C', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 20, 'nom': 'Français 3 et Anglais 3', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 21, 'nom': 'Art et Culture', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 22, 'nom': 'Analyse 4', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 23, 'nom': ' Analyse Numérique et Probabilité', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 24, 'nom': 'Optique Géométrique / Optique Physique', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 25, 'nom': 'Électromagnétisme', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 26, 'nom': 'Électronique Numérique et Analogique', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 27, 'nom': 'Français 4 et Anglais 4', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 28, 'nom': 'Efficacité Relationnelle et Dynamique de Groupe', 'filiere_id': 2, 'semestres': ['S1', 'S2']},
            {'id': 29, 'nom': 'matiere1', 'filiere_id': 3, 'semestres': ['S1', 'S2']},
        ]

        for matiere_data in matieres:
            # Récupérer la filière associée
            filiere = Filiere.objects.get(id=matiere_data['filiere_id'])

            # Créer ou récupérer l'objet Matiere
            matiere, created = Matiere.objects.get_or_create(
                id=matiere_data['id'],
                nom=matiere_data['nom'],
                filiere=filiere
            )

            # Lier les semestres
            semestres = Semestre.objects.filter(numero__in=matiere_data['semestres'])
            matiere.semestres.set(semestres)  # Associer les semestres à la matière

            matiere.save()

    def seed_profs(self):
        profs = [
            {'id': 1, 'nom': 'SABIL', 'prenom': 'JALILA', 'matieres': [1, 2, 3]},
            {'id': 2, 'nom': 'SAMADI', 'prenom': 'HASSAN', 'matieres': [4, 5, 6]},
            {'id': 3, 'nom': 'BOUAJAJ', 'prenom': 'ADEL', 'matieres': [7, 8, 9]},
            {'id': 4, 'nom': 'TOUHAMI', 'prenom': 'FAKHITA', 'matieres': [10, 11, 12]},
            {'id': 5, 'nom': 'EL ALAIJI', 'prenom': 'RACHID', 'matieres': [13, 14]},
            {'id': 6, 'nom': 'ALAOUI', 'prenom': 'ASMAE', 'matieres': [15, 16, 17]},

        ]

        for prof_data in profs:
            prof = Prof.objects.create(id=prof_data['id'], nom=prof_data['nom'], prenom=prof_data['prenom'])
            matieres = Matiere.objects.filter(id__in=prof_data['matieres'])
            prof.matieres.set(matieres)  # Associate the matieres to the professor
            prof.save()

    def seed_type_seances(self):
        matieres = Matiere.objects.all()
        categories = Categorie.objects.all()
        for matiere in matieres:
            for category in categories:
                type_seances = [
                {
                    "type_seance": Type.TP.name,
                    "volume_horaire_total": 30,
                    "volume_horaire_semaine": 2
                },
                {
                    "type_seance": Type.TD.name,
                    "volume_horaire_total": 20,
                    "volume_horaire_semaine": 1
                },
                {
                    "type_seance": Type.Cours.name,
                    "volume_horaire_total": 50,
                    "volume_horaire_semaine": 3
                }
                ]
                for type_seance in type_seances:
                    TypeSeance.objects.get_or_create(
                        type_seance=type_seance["type_seance"],
                    volume_horaire_total=type_seance["volume_horaire_total"],
                    volume_horaire_semaine=type_seance["volume_horaire_semaine"],
                    categorie=category,
                    matiere=matiere
                )

    def seed_prof_type_seances(self):
        profs = Prof.objects.all()
        type_seances = TypeSeance.objects.all()
        for prof in profs:
            assigned_seances = random.sample(list(type_seances), min(len(type_seances), 3))
            for type_seance in assigned_seances:
                Prof_TypeSeance.objects.get_or_create(
                    prof=prof,
                    type_seance=type_seance
                )




    def seed_salles(self):
        categories = list(Categorie.objects.all())
        salles = [
        {"nom": "Salle 101", "effectif": 30},
        {"nom": "Salle 202", "effectif": 40},
        {"nom": "Salle Industrielle", "effectif": 25},
        {"nom": "Salle Informatique", "effectif": 35},
        {"nom": "Salle Polyvalente", "effectif": 50}
    ]
        for salle in salles:
            categorie = random.choice(categories)  # Assign a random category
            Salle.objects.get_or_create(
            nom=salle["nom"],
            effectif=salle["effectif"],
            categorie=categorie
        )