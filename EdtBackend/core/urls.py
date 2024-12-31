from django.urls import path
from . import views

urlpatterns = [
    path('filieres/', views.get_filieres, name='get-filieres'),             
    path('filieres/create', views.create_filiere, name='create-filiere'),  
    path('filieres/<int:pk>', views.get_filiere_by_id, name='get-filiere'),
    path('filieres/<int:pk>/update', views.update_filiere, name='update-filiere'), 
    path('filieres/<int:pk>/delete', views.delete_filiere, name='delete-filiere'), 

    path('categories/', views.get_categories, name='get-categories'),             
    path('categories/create', views.create_categorie, name='create-categorie'),  
    path('categories/<int:pk>', views.get_categorie_by_id, name='get-categorie'),
    path('categories/<int:pk>/update', views.update_categorie, name='update-categorie'), 
    path('categories/<int:pk>/delete', views.delete_categorie, name='delete-categorie'),

    path('matieres/', views.get_matieres, name='get-matieres'),             
    path('matieres/create', views.create_matiere, name='create-matiere'),  
    path('matieres/<int:pk>', views.get_matiere_by_id, name='get-matiere'),
    path('matieres/<int:pk>/update', views.update_matiere, name='update-matiere'), 
    path('matieres/<int:pk>/delete', views.delete_matiere, name='delete-matiere'),

    path('typeSeances/', views.get_typeSeances, name='get-typeSeances'),             
    path('typeSeances/create', views.create_typeSeance, name='create-typeSeance'),  
    path('typeSeances/<int:pk>', views.get_typeSeance_by_id, name='get-typeSeance'),
    path('typeSeances/<int:pk>/update', views.update_typeSeance, name='update-typeSeance'), 
    path('typeSeances/<int:pk>/delete', views.delete_typeSeance, name='delete-typeSeance'),

    path('profs/', views.get_profs, name='get-profs'),             
    path('profs/create', views.create_prof, name='create-prof'),  
    path('profs/<int:pk>', views.get_prof_by_id, name='get-prof'),
    path('profs/<int:pk>/update', views.update_prof, name='update-prof'), 
    path('profs/<int:pk>/delete', views.delete_prof, name='delete-prof'), 

    path('profs/<int:pk>/typeSeances', views.get_prof_typeSeances, name='get-prof-typeSeances'),
    path('profs/<int:pk>/assign', views.assign_prof, name='assign-prof'),
    path('profs/<int:pk>/detach', views.detach_prof, name='detach-prof'),

    path('durations/', views.get_durations, name='get-durations'),             
    path('durations/create', views.create_duration, name='create-duration'),  
    path('durations/<int:pk>', views.get_duration_by_id, name='get-duration'),
    path('durations/<int:pk>/update', views.update_duration, name='update-duration'), 
    path('durations/<int:pk>/delete', views.delete_duration, name='delete-duration'),

    path('salles/', views.get_salles, name='get-salles'),             
    path('salles/create', views.create_salle, name='create-salle'),  
    path('salles/<int:pk>', views.get_salle_by_id, name='get-salle'),
    path('salles/<int:pk>/update', views.update_salle, name='update-salle'), 
    path('salles/<int:pk>/delete', views.delete_salle, name='delete-salle'),
]
