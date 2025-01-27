from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from userauth.decorators import is_authenticated
from .scheduler import genetic_algorithm, calculate_soft_constraints


#_________________________________________________________FILIERE_____________________________________________________________
@api_view(['Get'])
@is_authenticated
def get_filieres(request):
    filieres = Filiere.objects.all()
    serializer = FiliereSerializer(filieres, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_filiere(request):
    serializer = FiliereSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_filiere_by_id(request, pk):
    try:
        filiere = Filiere.objects.get(pk=pk)
    except Filiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la filière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = FiliereSerializer(filiere)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
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
@is_authenticated
def delete_filiere(request, pk):
    try:
        filiere = Filiere.objects.get(pk=pk)
    except Filiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la filière'}, status=status.HTTP_404_NOT_FOUND)
    
    filiere.delete()
    return Response({'message': 'la filiere a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________CATEGORIE_____________________________________________________________
@api_view(['Get'])
@is_authenticated
def get_categories(request):
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_categorie(request):
    serializer = CategorieSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_categorie_by_id(request, pk):
    try:
        categorie = Categorie.objects.get(pk=pk)
    except Categorie.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la catégorie'}, status=status.HTTP_404_NOT_FOUND)
    serializer = CategorieSerializer(categorie)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
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
@is_authenticated
def delete_categorie(request, pk):
    try:
        categorie = Categorie.objects.get(pk=pk)
    except Categorie.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la categorie'}, status=status.HTTP_404_NOT_FOUND)
    
    categorie.delete()
    return Response({'message': 'la categorie a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________Matiere________________________________________________________________
@api_view(['Get'])
@is_authenticated
def get_matieres(request):
    matieres = Matiere.objects.all()
    serializer = MatiereSerializer(matieres, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_matiere(request):
    serializer = MatiereSerializer(data=request.data)
    if serializer.is_valid():
        matiere = serializer.save()
        if 'semestres' in request.data:
            matiere.semestres.set(request.data['semestres'])
            matiere.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_matiere_by_id(request, pk):
    try:
        matiere = Matiere.objects.get(pk=pk)
    except Matiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la matière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = MatiereSerializer(matiere)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
def update_matiere(request, pk):
    try:
        matiere = Matiere.objects.get(pk=pk)
    except Matiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la matière'}, status=status.HTTP_404_NOT_FOUND)
    serializer = MatiereSerializer(matiere, data=request.data)
    if serializer.is_valid():
        serializer.save()
        matiere = serializer.save()
        if 'semestres' in request.data:
            matiere.semestres.set(request.data['semestres'])
            matiere.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@is_authenticated
def delete_matiere(request, pk):
    try:
        matiere = Matiere.objects.get(pk=pk)
    except Matiere.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la matière'}, status=status.HTTP_404_NOT_FOUND)
    
    matiere.delete()
    return Response({'message': 'la matière a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________TypeSeance_____________________________________________________________
@api_view(['Get'])
@is_authenticated
def get_typeSeances(request):
    typeSeances = TypeSeance.objects.all()
    serializer = TypeSeanceSerializer(typeSeances, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_typeSeance(request):
    serializer = TypeSeanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_typeSeance_by_id(request, pk):
    try:
        typeSeance = TypeSeance.objects.get(pk=pk)
    except TypeSeance.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le type de séance'}, status=status.HTTP_404_NOT_FOUND)
    serializer = TypeSeanceSerializer(typeSeance)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
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
@is_authenticated
def delete_typeSeance(request, pk):
    try:
        typeSeance = TypeSeance.objects.get(pk=pk)
    except TypeSeance.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le type de séance'}, status=status.HTTP_404_NOT_FOUND)
    
    typeSeance.delete()
    return Response({'message': 'le type de séance a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________PROF___________________________________________________________________
@api_view(['Get'])
@is_authenticated
def get_profs(request):
    profs = Prof.objects.all()
    serializer = ProfSerializer(profs, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_prof(request):
    serializer = ProfSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_prof_by_id(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    serializer = ProfSerializer(prof)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
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
@is_authenticated
def delete_prof(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    prof.delete()
    return Response({'message': 'le professeur a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________Prof_TypeSeance_________________________________________________________
@api_view(['GET'])
@is_authenticated
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
@is_authenticated
def assign_prof(request, pk):
    try:
        prof = Prof.objects.get(pk=pk)
    except Prof.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver le professeur'}, status=status.HTTP_404_NOT_FOUND)
    
    type_seance = request.data.get('type_seance')
    matiere = request.data.get('matiere')
    
    if not type_seance or not matiere:
        return Response({'error': 'Les champs "type_seance" et "matiere" sont requis.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        typeSeance = TypeSeance.objects.get(type_seance=type_seance,matiere=matiere)
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
@is_authenticated
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
@is_authenticated
def get_durations(request):
    durations = Duration.objects.all()
    serializer = DurationSerializer(durations, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_duration(request):
    serializer = DurationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_duration_by_id(request, pk):
    try:
        duration = Duration.objects.get(pk=pk)
    except Duration.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la duration'}, status=status.HTTP_404_NOT_FOUND)
    serializer = DurationSerializer(duration)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
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
@is_authenticated
def delete_duration(request, pk):
    try:
        duration = Duration.objects.get(pk=pk)
    except Duration.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la duration'}, status=status.HTTP_404_NOT_FOUND)
    
    duration.delete()
    return Response({'message': 'la duration a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_________________________________________________________Salle___________________________________________________________________
@api_view(['Get'])
@is_authenticated
def get_salles(request):
    salles = Salle.objects.all()
    serializer = SalleSerialiser(salles, many = True)
    return Response(serializer.data)

@api_view(['POST'])
@is_authenticated
def create_salle(request):
    serializer = SalleSerialiser(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@is_authenticated
def get_salle_by_id(request, pk):
    try:
        salle = Salle.objects.get(pk=pk)
    except Salle.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la salle'}, status=status.HTTP_404_NOT_FOUND)
    serializer = SalleSerialiser(salle)
    return Response(serializer.data)

@api_view(['PUT'])
@is_authenticated
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
@is_authenticated
def delete_salle(request, pk):
    try:
        salle = Salle.objects.get(pk=pk)
    except Salle.DoesNotExist:
        return Response({'error': 'Nous n\'avons pas trouver la salle'}, status=status.HTTP_404_NOT_FOUND)
    
    salle.delete()
    return Response({'message': 'la salle a bien été supprimer'},status=status.HTTP_204_NO_CONTENT)

#_______________________________________________génération d'emploi du temps_________________________________________________________________
@api_view(['GET'])
@is_authenticated
def generate_schedule(request):
    # Récupérer toutes les filières
    filieres = Filiere.objects.all()
    if not filieres.exists():
        return Response(
            {"error": "Aucune filière disponible pour générer un emploi du temps."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Liste pour stocker les emplois du temps générés
    generated_schedules = []

    # Générer l'emploi du temps pour chaque filière
    for filiere in filieres:
        # Générer le meilleur emploi du temps avec l'algorithme génétique
        best_schedule = genetic_algorithm([filiere])

        # Calculer le score de fitness
        fitness_score = calculate_soft_constraints(best_schedule)

        # Créer l'instance de Schedule
        schedule = Schedule.objects.create(fitness_score=fitness_score, filiere=filiere)

        # Ajouter les séances à l'emploi du temps
        schedule_details = []  # Liste pour stocker les détails des séances de cet emploi du temps
        print("Contenu de best_schedule:", best_schedule)
        print("debut ajout de seance")
        for seance_data in best_schedule:
            if not isinstance(seance_data, Seance):
                print(f"Erreur : seance_data n'est pas un objet Seance : {seance_data}")
                continue

            print(f"Séance à ajouter: Salle: {seance_data.salle}, Prof: {seance_data.prof}, "
                  f"Durations: {seance_data.durations.all()}, Type de séance: {seance_data.type_seance}")

            # Ajouter la séance à l'emploi du temps
            schedule.seances.add(seance_data)

            # Sérialiser la séance avec SeanceSerializer
            seance_serialized = SeanceSerializer(seance_data)
           

            # Ajouter les détails de la séance dans le format attendu pour la réponse
            schedule_details.append(seance_serialized.data)

        # Ajouter l'emploi du temps généré à la liste
        generated_schedules.append({
            'filiere': filiere.nom,
            'schedule_id': schedule.id,
            'fitness_score': fitness_score,
            'schedule_details': schedule_details
        })

    return Response(
        {
            "message": "Emplois du temps générés avec succès!",
            "generated_schedules": generated_schedules
        },
        status=status.HTTP_201_CREATED
    )