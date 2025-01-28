from rest_framework import serializers  
from .models import *

class FiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiere
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class MatiereSerializer(serializers.ModelSerializer):
    semestres = serializers.PrimaryKeyRelatedField(queryset=Semestre.objects.all(), many=True)

    class Meta:
        model = Matiere
        fields = '__all__'

class TypeSeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeSeance
        fields = '__all__'

class ProfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prof
        fields = ['id', 'nom', 'prenom']

class ProfTypeSeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prof_TypeSeance
        fields = '__all__'

class DurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Duration
        fields = '__all__'

class SalleSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = '__all__'

class SeanceSerializer(serializers.ModelSerializer):
    salle = SalleSerialiser()  # Sérialiser la relation Salle
    prof = ProfSerializer()  # Sérialiser la relation Prof
    durations = DurationSerializer(many=True)  # Sérialiser la relation Duration
    type_seance = TypeSeanceSerializer()  # Sérialiser la relation TypeSeance

    class Meta:
        model = Seance
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    filiere = FiliereSerializer()
    schedule_details = SeanceSerializer(many=True,source='seances')

    class Meta:
        model = Schedule
        fields = ['filiere', 'schedule_id', 'fitness_score', 'schedule_details']