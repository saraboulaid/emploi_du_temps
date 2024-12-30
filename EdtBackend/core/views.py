from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

#########################################################FILIERE###########################################################
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
    return Response({'message': 'la filiere à bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#########################################################CATEGORIE###########################################################
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
    return Response({'message': 'la categorie à bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#########################################################PROF###########################################################
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
    return Response({'message': 'le professeur à bien été supprimer'},status=status.HTTP_204_NO_CONTENT)
