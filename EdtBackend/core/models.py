from django.db import models
from enum import Enum

class Type(Enum):
    TP = "TP"
    TD = "TD"
    Cours = "Cours"

# Une salle à une catégorie c à d il est disponible que pour certaine type de seance 
# Ex: Une salle industrielle est allouée que au TP indus 
# d'où la Type seance est lié à une et une seule catégorie du même une salle peut être liée à une et une seule catégorie

class Categorie(models.Model):
    nom = models.CharField(max_length=255)

class Filiere(models.Model):
    nom = models.CharField(max_length=255)

class Semestre(models.Model):
    SEMESTRE_CHOICES = [
        ('S1', 'Semestre 1'),
        ('S2', 'Semestre 2'),
        ('S3', 'Semestre 3'),
        ('S4', 'Semestre 4'),
    ]
    numero = models.CharField(max_length=2, choices=SEMESTRE_CHOICES, unique=True)

class Matiere(models.Model):
    nom = models.CharField(max_length=255)
    semestres = models.ManyToManyField(Semestre)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE)

class TypeSeance(models.Model):
    type_seance = models.CharField(max_length=50, choices=[(tag.name, tag.value) for tag in Type])
    volume_horaire_total = models.IntegerField()
    volume_horaire_semaine = models.IntegerField()
    categorie = models.ForeignKey(Categorie,null=True, on_delete=models.SET_NULL)
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE)

class Prof(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)

class Prof_TypeSeance(models.Model):
    prof = models.ForeignKey(Prof, on_delete = models.CASCADE)
    type_seance = models.ForeignKey(TypeSeance, on_delete = models.CASCADE)

class Duration(models.Model):
    jour = models.CharField(max_length=255)
    horaire_debut_seance = models.TimeField()
    horaire_fin_seance = models.TimeField()

class Salle(models.Model):
    nom = models.CharField(max_length=255)
    effectif = models.IntegerField()
    categorie = models.ForeignKey(Categorie,null=True, on_delete=models.SET_NULL)
    
# Séance
class Seance(models.Model):
    nom = models.CharField(max_length=255)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE, default=1)
    matiere = models.ForeignKey(Matiere, on_delete=models.CASCADE,default=1)  # Champ requis
    equipements = models.JSONField()  # Pour lister les équipements comme un tableau JSON
    effectif = models.IntegerField()
    categorie = models.ForeignKey(Categorie, null=True, on_delete=models.SET_NULL)
    salle = models.ForeignKey(Salle, on_delete=models.CASCADE, related_name="seances")
    prof = models.ForeignKey(Prof, on_delete=models.CASCADE, related_name="seances")
    type_seance = models.ForeignKey(TypeSeance, on_delete=models.CASCADE)
    durations = models.ManyToManyField(Duration, related_name="seances")

# Génération d'emploi du temps
class Gene(models.Model):
    date_generation = models.DateTimeField(auto_now_add=True)
    seances = models.ManyToManyField(Seance, related_name="genes")
    filieres = models.ManyToManyField(Filiere, related_name="genes")

class Schedule(models.Model):
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE, related_name="schedules")
    seances = models.ManyToManyField(Seance)
    date_created = models.DateTimeField(auto_now_add=True)
    fitness_score = models.FloatField(default=0)
