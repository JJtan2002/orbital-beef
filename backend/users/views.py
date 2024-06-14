from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import User
from django.http import JsonResponse
from django.contrib.auth import get_user_model
import random
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == 'POST':
        data = request.data
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not email or not password or not name:
            return JsonResponse({'error': 'Please provide all the required fields'}, status=400)
        
        UserModel = get_user_model()
        try:
            user = UserModel.objects.create_user(name = name, email = email, password = password)
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'message': 'Successful Registration!',
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=405)
        
# Create your views here.
