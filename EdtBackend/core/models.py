from django.db import models
import json
from django.forms import ValidationError
from enum import Enum

class Type(Enum):
    Travaux_Pratiques = "TP"
    Travaux_dérigés = "TD"
    Cours = "Cours"

# Une salle à une catégorie c à d il est disponible que pour certaine type de seance 
# Ex: Une salle industrielle est allouée que au TP indus 
# d'où la Type seance est lié à une et une seule catégorie du même une salle peut être liée à une et une seule catégorie

class Categorie(models.Model):
    nom = models.CharField(max_length=255)

class Filiere(models.Model):
    nom = models.CharField(max_length=255)

class Matiere(models.Model):
    nom = models.CharField(max_length=255)
    semestres = models.TextField(blank=False)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE)

    def clean(self):
        try:
            semestres = json.loads(self.misemestre)
        except json.JSONDecodeError:
            raise ValidationError("Le champ misemestre doit contenir une liste JSON valide.")

        if not all(isinstance(i, int) and 1 <= i <= 12 for i in semestres):
            raise ValidationError("Tous les semestres doivent être des entiers entre 1 et 12.") 

class TypeSeance(models.Model):
    type_seance = Type
    volume_horaire_total = models.IntegerField
    volume_horaire_semaine = models.IntegerField
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
    horaire_debut_seance = models.IntegerField
    horaire_fin_seance = models.IntegerField

class Salle(models.Model):
    nom = models.CharField(max_length=255)
    effectif = models.IntegerField
    categorie = models.ForeignKey(Categorie,null=True, on_delete=models.SET_NULL)

class Seance(models.Model):
    salle = models.ForeignKey(Salle,null=True, on_delete=models.SET_NULL)
    prof = models.ForeignKey(Prof,null=True, on_delete=models.SET_NULL)
    matiere = models.ForeignKey(TypeSeance,null=True, on_delete=models.SET_NULL)
    
