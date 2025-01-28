

# #############################################
# #############################################
# #############################################
# #############################################
# #############################################
# #############################################  temps reduit 
import random
from datetime import time
from django.db.models import Prefetch
from .models import Filiere, Salle, Prof, Matiere, Seance, Duration, Schedule


# Vérification des contraintes dures 
def check_hard_constraints(schedule):
    salle_occupations = {}
    prof_occupations = {}
    filiere_occupations = {}  # Ajout pour vérifier les horaires par filière
    salle_filiere_horaire_occupations = {}  # Nouvelle contrainte : éviter plusieurs filières dans la même salle au même horaire
    filiere_matiere_occupations = {}

    for seance in schedule:
        # Vérifier la capacité des salles
        if seance.salle.effectif < seance.effectif:
            print(f"Capacité insuffisante pour la salle {seance.salle}")
            return False

        # Vérifier les conflits d'horaires
        for duration in seance.durations.all():
            salle_key = (seance.salle.id, duration.jour)
            prof_key = (seance.prof.id, duration.jour)
            filiere_key = (seance.filiere.id, duration.jour)  # Clé pour vérifier par filière
            salle_filiere_key = (seance.salle.id, duration.jour, duration.horaire_debut_seance, duration.horaire_fin_seance)
            module_key = (seance.filiere.id, duration.jour, duration.horaire_debut_seance, duration.horaire_fin_seance)

            # Initialisation des dictionnaires si clé absente
            salle_occupations.setdefault(salle_key, [])
            prof_occupations.setdefault(prof_key, [])
            filiere_occupations.setdefault(filiere_key, [])
            salle_filiere_horaire_occupations.setdefault(salle_filiere_key, set())
            filiere_matiere_occupations.setdefault(filiere_key, {})

            # Vérification des conflits pour la salle
            for (start, end) in salle_occupations[salle_key]:
                if start < duration.horaire_fin_seance and end > duration.horaire_debut_seance:
                    print(f"Conflit d'horaires pour la salle {seance.salle}")
                    return False

            # Vérification des conflits pour le professeur
            for (start, end) in prof_occupations[prof_key]:
                if start < duration.horaire_fin_seance and end > duration.horaire_debut_seance:
                    print(f"Conflit d'horaires pour le professeur {seance.prof}")
                    return False

            # Vérification des conflits pour la filière
            for (start, end) in filiere_occupations[filiere_key]:
                if start < duration.horaire_fin_seance and end > duration.horaire_debut_seance:
                    print(f"Conflit d'horaires pour la filière {seance.filiere}")
                    return False
                
            matiere_id = seance.matiere.id
            # Vérification des conflits pour la matière dans la même filière
            for (start, end) in filiere_matiere_occupations[filiere_key].values():
                if start < duration.horaire_fin_seance and end > duration.horaire_debut_seance:
                    print(f"Conflit : plusieurs matières différentes pour la filière {seance.filiere} au même horaire ({duration.jour}, {duration.horaire_debut_seance}-{duration.horaire_fin_seance})")
                    return False

            # Vérification des conflits entre filières dans la même salle et au même horaire
            if seance.filiere.id in salle_filiere_horaire_occupations[salle_filiere_key]:
                print(f"Conflit : plusieurs filières dans la salle {seance.salle.nom} au même horaire ({duration.jour}, {duration.horaire_debut_seance}-{duration.horaire_fin_seance})")
                return False

            # Vérification des conflits entre matières dans la même salle pour la même filière
            if seance.filiere.id in salle_filiere_horaire_occupations[salle_filiere_key]:
                for matiere_id, (start, end) in filiere_matiere_occupations[filiere_key].items():
                    if start < duration.horaire_fin_seance and end > duration.horaire_debut_seance:
                        print(f"Conflit : plusieurs matières différentes pour la filière {seance.filiere} dans la salle {seance.salle.nom} au même horaire ({duration.jour}, {duration.horaire_debut_seance}-{duration.horaire_fin_seance})")
                        return False

            # Ajouter l'occupation pour la salle, le prof, et la filière
            salle_occupations[salle_key].append((duration.horaire_debut_seance, duration.horaire_fin_seance))
            prof_occupations[prof_key].append((duration.horaire_debut_seance, duration.horaire_fin_seance))
            filiere_occupations[filiere_key].append((duration.horaire_debut_seance, duration.horaire_fin_seance))
            salle_filiere_horaire_occupations[salle_filiere_key].add(seance.filiere.id)
            filiere_matiere_occupations[filiere_key][matiere_id] = (duration.horaire_debut_seance, duration.horaire_fin_seance)

    return True










# Calcul des contraintes souples
def calculate_soft_constraints(schedule):
    score = 0
    for seance in schedule:
        for duration in seance.durations.all():
            if duration.horaire_debut_seance.hour >= 9:
                score += 1
    return score

# Génération d'une population aléatoire
# Génération d'une population aléatoire
def generate_population(filieres, population_size=100):
    salles = list(Salle.objects.all())
    durations = list(Duration.objects.all())
    population = []

    if not salles or not durations:
        raise ValueError("Salles or Durations are empty, cannot generate population")

    for _ in range(population_size):
        schedule = []
        for filiere in filieres:
            matieres = filiere.matiere_set.prefetch_related('profs', 'typeseance_set').all()
            if not matieres:
                continue  # Skip if no matieres are available for this filière

            for matiere in matieres:
                if matiere.typeseance_set.exists():
                    salle = random.choice(salles) if salles else None
                    prof = random.choice(matiere.profs.all()) if matiere.profs.all() else None
                    duration = random.choice(durations) if durations else None
                    type_seance = random.choice(matiere.typeseance_set.all()) if matiere.typeseance_set.exists() else None

                    # Check if necessary data is missing
                    if not salle or not prof or not duration or not type_seance:
                        continue  # Skip this combination if essential info is missing
                    
                    effectif = random.randint(10, min(30, salle.effectif))
                    seance = Seance.objects.create(
                        salle=salle,
                        prof=prof,
                        type_seance=type_seance,
                        effectif=effectif,
                        equipements="Equipement par défaut"
                    )
                    seance.durations.set([duration])
                    schedule.append(seance)
        population.append(schedule)

    return population

# Algorithme génétique
def genetic_algorithm(filieres, iterations=100):
    population = generate_population(filieres)

    for iteration in range(iterations):
        # Évaluation
        fitness_scores = [
            (schedule, calculate_soft_constraints(schedule))
            for schedule in population if check_hard_constraints(schedule)
        ]

        if not fitness_scores:
            print("Aucune solution valide pour l'itération", iteration)
            continue

        # Tri des solutions par score
        fitness_scores.sort(key=lambda x: x[1], reverse=True)
        population = [schedule for schedule, _ in fitness_scores[:10]]

        # Croisement
        new_population = []
        for _ in range(len(population) // 2):
            parent1 = random.choice(population) if population else None
            parent2 = random.choice(population) if population else None

            if parent1 is None or parent2 is None:
                continue  # Skip if no parents available

            crossover_point = len(parent1) // 2
            offspring = parent1[:crossover_point] + parent2[crossover_point:]
            new_population.append(offspring)

        population.extend(new_population)

        # Mutation
        for schedule in population:
            if random.random() < 0.1:  # 10% de chance de mutation
                seance = random.choice(schedule) if schedule else None
                if seance:
                    seance.salle = random.choice(Salle.objects.all()) if Salle.objects.all() else seance.salle
                    seance.save()

    # Retourner la meilleure solution
    return population[0] if population else []







# #############################################
# #############################################
# #############################################
# #############################################
# #############################################
# ############################################# long durée d'éxécution

# import random
# from datetime import time
# from .models import Filiere, Salle, Prof, Matiere, Seance, Duration, Schedule  

# # Hard constraints
# def check_hard_constraints(schedule):
#     for seance in schedule:
#         # Vérifier si les salles ne sont pas surchargées
#         if seance.salle.effectif < seance.effectif:
#             print(f"Contrainte de salle non respectée pour {seance.salle}")
#             return False

#         # Vérifier les conflits d'horaires pour les salles et les professeurs
#         for other in schedule:
#             if seance != other:
#                 # Assurez-vous que les deux séances ont des durées
#                 seance_durations = seance.durations.all()  # Récupérer toutes les durées
#                 other_durations = other.durations.all()  # Récupérer toutes les durées
                
#                 for seance_duration in seance_durations:
#                     for other_duration in other_durations:
#                         if seance_duration.jour == other_duration.jour:
#                             # Comparaison des horaires de début et de fin
#                             if (seance_duration.horaire_debut_seance < other_duration.horaire_fin_seance and 
#                                 seance_duration.horaire_fin_seance > other_duration.horaire_debut_seance):
#                                 print(f"Conflit d'horaires entre {seance} et {other}")
#                                 return False
                
#     return True



# def calculate_soft_constraints(schedule):
#     score = 0
#     for seance in schedule:
#         # Parcourir toutes les durées associées à la séance
#         for duration in seance.durations.all():
#             if duration.horaire_debut_seance.hour >= 9:  # Accéder à l'heure de début
#                 score += 1
#     return score



# # Générer une population aléatoire


# def generate_population(filieres, population_size=100):
#     population = []
#     for _ in range(population_size):
#         schedule = []
#         for filiere in filieres:
#             if filiere.matiere_set.exists():
#                 for matiere in filiere.matiere_set.all():
#                     print(f"Matière trouvée: {matiere.nom}")
#                     # Récupérer les types de séance associés à la matière
#                     types_seance = matiere.typeseance_set.all()
#                     if types_seance.exists():  # Vérifiez si la matière a des types de séance
#                         # Sélectionner des valeurs au hasard
#                         salle = random.choice(Salle.objects.all())
#                         prof = random.choice(matiere.profs.all())
#                         duration = random.choice(Duration.objects.all())
#                         type_seance = random.choice(types_seance)
#                         effectif = random.randint(10, 30)
                        
#                         # Ajoutez un contrôle sur les équipements
#                         equipements = "Equipement par défaut"  # Remplacez par la logique appropriée
                        
#                         # Affichage des valeurs choisies au hasard
#                         print(f"Salle choisie: {salle}")
#                         print(f"Professeur choisi: {prof}")
#                         print(f"Durée choisie: {duration}")
#                         print(f"Type de séance choisi: {type_seance}")
#                         print(f"Effectif choisi: {effectif}")
#                         print(f"Equipement choisi: {equipements}")
                        
#                         # Créer la séance avec les valeurs choisies
#                         seance = Seance.objects.create(
#                             salle=salle,
#                             prof=prof,
#                             type_seance=type_seance,
#                             effectif=effectif,
#                             equipements=equipements  # Assurez-vous que cet attribut est toujours renseigné
#                         )
#                         seance.durations.set([duration]) 
#                         schedule.append(seance)
#                     else:
#                         print("Aucun type de séance existant")
#         population.append(schedule)
#     return population


# # Algorithme génétique
# def genetic_algorithm(filieres, iterations=100):
#     population = generate_population(filieres)
#     print("Population initiale générée:", population)  # Pour voir la population initiale
    
#     for iteration in range(iterations):
        
#         # Évaluation
#         fitness_scores = [
#             calculate_soft_constraints(schedule)
#             for schedule in population if check_hard_constraints(schedule)
#         ]
        
#         if not fitness_scores:
#             print("Aucune solution valide dans cette itération.")
#             continue
        
#         # Sélection
#         sorted_population = sorted(population, key=lambda x: calculate_soft_constraints(x), reverse=True)
#         population = sorted_population[:10]  # Garder les 10 meilleures solutions
        
        
        
#         # Si la population est vide après la sélection, arrêtez l'algorithme
#         if len(population) == 0:
#             print("Aucune solution valide après la sélection.")
#             break
        
#         # Croisement et mutation restent inchangés
#         new_population = []
#         for _ in range(len(population) // 2):
#             parent1 = random.choice(population)
#             parent2 = random.choice(population)
#             crossover_point = len(parent1) // 2
#             offspring = parent1[:crossover_point] + parent2[crossover_point:]
#             new_population.append(offspring)
        
#         population.extend(new_population)
        
#         # Mutation
#         for schedule in population:
#             if random.random() < 0.1:  # 10% de chance de mutation
#                 available_salles = list(Salle.objects.all())
#                 if available_salles and len(schedule) > 0:
#             # Choisir une séance au hasard dans le planning
#                   seance = random.choice(schedule)
#             # Modifier l'attribut salle directement
#                   seance.salle = random.choice(available_salles)
#                   seance.save()  # Assurez-vous d'enregistrer les modifications si nécessaire

    
#     # Retourner la meilleure solution
#     best_schedule = population[0] if population else []
#     print("Meilleur emploi du temps trouvé:")
#     return best_schedule


# #############################################
# #############################################
# #############################################
# #############################################
# #############################################
# ############################################# nv code 
