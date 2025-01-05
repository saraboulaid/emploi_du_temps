import jwt
from jwt import DecodeError, ExpiredSignatureError
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

def is_authenticated(view_func):
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({'error': 'Token manquant ou mal formaté.'}, status= status.HTTP_401_UNAUTHORIZED)
        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            request.user_id = payload['user_id']
        except ExpiredSignatureError:
            return Response({'error': 'Token expiré'}, status= status.HTTP_401_UNAUTHORIZED)
        except DecodeError:
            return Response({'error': 'Token invalid'}, status= status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': f'Erreur inconnue : {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return view_func(request, *args, **kwargs)
    return wrapper