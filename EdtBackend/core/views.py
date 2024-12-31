from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

#_________________________________________________________FILIERE_____________________________________________________________
@api_view(['Get'])
def get_filieres(request):
    filieres = Filiere.objects.all()
    serializer = FiliereSerializer(filieres, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_filiere(request):
    serializer = FiliereSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_filiere_by_id(request, pk):
    try:
        filiere = Filiere.objects.get(pk=pk)
    except Filiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la filière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = FiliereSerializer(filiere)
    return Response(serializer.data)

@api_view(['PUT'])
def update_filiere(request, pk):
    try:
        filiere = Filiere.objects.get(pk=pk)
    except Filiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la filière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = FiliereSerializer(filiere, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_filiere(request, pk):
    try:
        filiere = Filiere.objects.get(pk=pk)
    except Filiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la filière'}, status=status.HTTP_404_NOT_FOUND)
    
    filiere.delete()
    return Response({'message': 'la filiere a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________CATEGORIE_____________________________________________________________
@api_view(['Get'])
def get_categories(request):
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_categorie(request):
    serializer = CategorieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_categorie_by_id(request, pk):
    try:
        categorie = Categorie.objects.get(pk=pk)
    except Categorie.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la catégorie'}, status=status.HTTP_404_NOT_FOUND)
    serializer = CategorieSerializer(categorie)
    return Response(serializer.data)

@api_view(['PUT'])
def update_categorie(request, pk):
    try:
        categorie = Categorie.objects.get(pk=pk)
    except Categorie.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la categorie'}, status=status.HTTP_404_NOT_FOUND)
    serializer = CategorieSerializer(categorie, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_categorie(request, pk):
    try:
        categorie = Categorie.objects.get(pk=pk)
    except Categorie.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la categorie'}, status=status.HTTP_404_NOT_FOUND)
    
    categorie.delete()
    return Response({'message': 'la categorie a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________Matiere________________________________________________________________
@api_view(['Get'])
def get_matieres(request):
    matieres = Matiere.objects.all()
    serializer = MatiereSerializer(matieres, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_matiere(request):
    serializer = MatiereSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_matiere_by_id(request, pk):
    try:
        matiere = Matiere.objects.get(pk=pk)
    except Matiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la matière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = MatiereSerializer(matiere)
    return Response(serializer.data)

@api_view(['PUT'])
def update_matiere(request, pk):
    try:
        matiere = Matiere.objects.get(pk=pk)
    except Matiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la matière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = MatiereSerializer(matiere, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_matiere(request, pk):
    try:
        matiere = Matiere.objects.get(pk=pk)
    except Matiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la matière'}, status=status.HTTP_404_NOT_FOUND)
    
    matiere.delete()
    return Response({'message': 'la matière a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________TypeSeance_____________________________________________________________
@api_view(['Get'])
def get_typeSeances(request):
    typeSeances = TypeSeance.objects.all()
    serializer = TypeSeanceSerializer(typeSeances, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_typeSeance(request):
    serializer = TypeSeanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_typeSeance_by_id(request, pk):
    try:
        typeSeance = TypeSeance.objects.get(pk=pk)
    except TypeSeance.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le type de séance'}, status=status.HTTP_404_NOT_FOUND)
    serializer = TypeSeanceSerializer(typeSeance)
    return Response(serializer.data)

@api_view(['PUT'])
def update_typeSeance(request, pk):
    try:
        typeSeance = TypeSeance.objects.get(pk=pk)
    except TypeSeance.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le type de Séance'}, status=status.HTTP_404_NOT_FOUND)
    serializer = TypeSeanceSerializer(typeSeance, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_typeSeance(request, pk):
    try:
        typeSeance = TypeSeance.objects.get(pk=pk)
    except TypeSeance.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le type de séance'}, status=status.HTTP_404_NOT_FOUND)
    
    typeSeance.delete()
    return Response({'message': 'le type de séance a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________PROF___________________________________________________________________
@api_view(['Get'])
def get_profs(request):
    profs = Prof.objects.all()
    serializer = ProfSerializer(profs, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_prof(request):
    serializer = ProfSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_prof_by_id(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProfSerializer(prof)
    return Response(serializer.data)

@api_view(['PUT'])
def update_prof(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProfSerializer(prof, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_prof(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    prof.delete()
    return Response({'message': 'le professeur a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________Prof_TypeSeance_________________________________________________________
@api_view(['GET'])
def get_prof_typeSeances(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    prof_type_seances = Prof_TypeSeance.objects.filter(prof=prof)
    if not prof_type_seances.exists():
        return Response({'error': 'Aucun type de séance n\'a été affecté à ce professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfTypeSeanceSerializer(prof_type_seances, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def assign_prof(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        typeSeance = TypeSeance.objects.get(type=request.data.get('type'),matiere=request.data.get('matiere'))
    except TypeSeance.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le type de séance'}, status=status.HTTP_404_NOT_FOUND)

    data = {
        'type_seance' : typeSeance.id,
        'prof' : prof.id
    }

    serializer = ProfTypeSeanceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def detach_prof(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    type_seance_id = request.data.get('typeSeance')
    if not type_seance_id:
        return Response({'error': 'Le type de séance est requis'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        prof_typeSeance = Prof_TypeSeance.objects.get(prof=prof.id,type_seance=type_seance_id)
    except Prof_TypeSeance.DoesNotExist:
        return Response({'error': 'Ce professeur n\'est pas affecté à ce type de séance'}, status=status.HTTP_404_NOT_FOUND)
    
    prof_typeSeance.delete()
    return Response({'message': 'le professeur a bien été détaché du type de séance'},status=status.HTTP_200_OK)

#_________________________________________________________Duration________________________________________________________________
@api_view(['Get'])
def get_durations(request):
    durations = Duration.objects.all()
    serializer = DurationSerializer(durations, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_duration(request):
    serializer = DurationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_duration_by_id(request, pk):
    try:
        duration = Duration.objects.get(pk=pk)
    except Duration.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la duration'}, status=status.HTTP_404_NOT_FOUND)
    serializer = DurationSerializer(duration)
    return Response(serializer.data)

@api_view(['PUT'])
def update_duration(request, pk):
    try:
        duration = Duration.objects.get(pk=pk)
    except Duration.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la duration'}, status=status.HTTP_404_NOT_FOUND)
    serializer = DurationSerializer(duration, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_duration(request, pk):
    try:
        duration = Duration.objects.get(pk=pk)
    except Duration.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la duration'}, status=status.HTTP_404_NOT_FOUND)
    
    duration.delete()
    return Response({'message': 'la duration a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________Salle___________________________________________________________________
@api_view(['Get'])
def get_salles(request):
    salles = Salle.objects.all()
    serializer = SalleSerialiser(salles, many = True)
    return Response(serializer.data)

@api_view(['POST'])
def create_salle(request):
    serializer = SalleSerialiser(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_salle_by_id(request, pk):
    try:
        salle = Salle.objects.get(pk=pk)
    except Salle.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la salle'}, status=status.HTTP_404_NOT_FOUND)
    serializer = SalleSerialiser(salle)
    return Response(serializer.data)

@api_view(['PUT'])
def update_salle(request, pk):
    try:
        salle = Salle.objects.get(pk=pk)
    except Salle.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la salle'}, status=status.HTTP_404_NOT_FOUND)
    serializer = SalleSerialiser(salle, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_salle(request, pk):
    try:
        salle = Salle.objects.get(pk=pk)
    except Salle.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la salle'}, status=status.HTTP_404_NOT_FOUND)
    
    salle.delete()
    return Response({'message': 'la salle a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)
