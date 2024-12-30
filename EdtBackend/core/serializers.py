from rest_framework import serializers  
from .models import *

class FiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiere
        fields = '__all__'

class ProfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prof
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class SalleSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = '__all__'

