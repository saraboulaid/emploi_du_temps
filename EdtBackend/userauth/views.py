import jwt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from datetime import datetime, timedelta
from .models import User

@api_view(['POST'])
def register(request):
    email = request.data.get('email') 
    password = request.data.get('password')
    if not email or not password :
        return Response({'error': 'l\'email et le mot de passe sont obligatires.'}, status= status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Un compte existe déjà pour cet email.'}, status= status.HTTP_400_BAD_REQUEST)
    user = User.objects.create(email=email)
    user.set_password(password)
    user.save()
    payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.utcnow() + timedelta(hours=2)
        }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return Response({'message': 'Votre compte a été créé avec succès.', 'token': token}, status= status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    email = request.data.get('email') 
    password = request.data.get('password')
    if not email or not password :
        return Response({'error': 'l\'email et le mot de passe sont obligatires.'}, status= status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Identifiants incorrects.'}, status= status.HTTP_401_UNAUTHORIZED)
    if user.check_password(password):
        payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.utcnow() + timedelta(hours=2)
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return Response({'message': 'Vous êtes connecté avec succès.', 'token': token}, status= status.HTTP_200_OK)
    return Response({'error': 'Identifiants incorrects.'}, status= status.HTTP_401_UNAUTHORIZED)
