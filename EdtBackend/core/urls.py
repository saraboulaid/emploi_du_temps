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

    path('profs/', views.get_profs, name='get-profs'),             
    path('profs/create', views.create_prof, name='create-prof'),  
    path('profs/<int:pk>', views.get_prof_by_id, name='get-prof'),
    path('profs/<int:pk>/update', views.update_prof, name='update-prof'), 
    path('profs/<int:pk>/delete', views.delete_prof, name='delete-prof'), 

    path('salles/', views.get_salles, name='get-salles'),             
    path('salles/create', views.create_salle, name='create-salle'),  
    path('salles/<int:pk>', views.get_salle_by_id, name='get-salle'),
    path('salles/<int:pk>/update', views.update_salle, name='update-salle'), 
    path('salles/<int:pk>/delete', views.delete_salle, name='delete-salle'),
]
