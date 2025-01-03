from django.core.management.base import BaseCommand
from core.models import Duration, Semestre, Filiere

class Command(BaseCommand):
    help = 'Seed data in the database'

    def handle(self, *args, **kwargs):
        self.seed_durations()

        self.seed_semestres()

        self.seed_filieres()

        self.stdout.write(self.style.SUCCESS('Durations seeded successfully!'))

    def seed_durations(self):
        jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
        horaires = {
            'Lundi': [('09:00:00', '10:30:00'), ('11:00:00', '12:30:00'), ('13:30:00', '15:00:00'), ('15:30:00', '17:00:00')],
            'Mardi': [('09:00:00', '10:30:00'), ('11:00:00', '12:30:00'), ('13:30:00', '15:00:00'), ('15:30:00', '17:00:00')],
            'Mercredi': [('09:00:00', '10:30:00'), ('11:00:00', '12:30:00'), ('13:30:00', '15:00:00'), ('15:30:00', '17:00:00')],
            'Jeudi': [('09:00:00', '10:30:00'), ('11:00:00', '12:30:00'), ('13:30:00', '15:00:00'), ('15:30:00', '17:00:00')],
            'Vendredi': [('09:00:00', '10:30:00'), ('11:00:00', '12:30:00'), ('14:00:00', '15:30:00'), ('16:00:00', '17:30:00')],
        }

        for jour in jours:
            for horaire_debut, horaire_fin in horaires[jour]:
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

