from rest_framework.permissions import AllowAny
from .models import User
from .serializers import ProfileSerializer
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import permission_classes, api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from cashflow.supabase_utils import upload_file


UserModel = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == 'POST':
        data = request.data
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Account with this email already exists.'}, status=409)

        if not email or not password or not name:
            return JsonResponse({'error': 'Please provide all the required fields'}, status=400)
        
        try:
            user = UserModel.objects.create_user(name = name, email = email, password = password)
            refresh = RefreshToken.for_user(user)
            refresh['name']=user.name
            refresh['email']=user.email 
            return JsonResponse({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'message': 'Successful Registration!',
            })
            # return JsonResponse({
            #     'success': 'Account Created! Please log in.',
            # }, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=405)
        
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verification(request):
    if request.method == 'GET':
        return JsonResponse({
            'success': "valid account, persist loggedin",
        })
    

@api_view(['POST'])
@permission_classes([AllowAny])
def forgetpassword(request):
    email = request.data.get('email')

    if not UserModel.objects.filter(email=email).exists():
        return JsonResponse({'message': 'Invalid Email'}, status=200)
    
    user = UserModel.objects.get(email=email)
    token = RefreshToken.for_user(user)
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    frontend_base_url = settings.FRONTEND_BASE_URL
    reset_link = f"{frontend_base_url}/resetPassword/{uidb64}/{token}/"

    send_mail(
        'Password Reset Request',
        f'Use the link below to reset your password in CashFlow: {reset_link}',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

    return JsonResponse({
        'success': 'true',
        'message': 'Password reset link sent',
    }, status=200)


@api_view(['POST'])
@permission_classes([AllowAny])
def resetPassword(request):
    try:
        uidb64 = request.data.get('uidb64')
        token = request.data.get('token')
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = UserModel.objects.get(pk=uid)

        try:
            refresh_token = RefreshToken(token)
            if refresh_token['user_id'] != user.id:
                return JsonResponse({'error': 'Invalid token for the user'}, status=200)
              
            password = request.data.get('password')
            user.set_password(password)
            user.save()
            refresh_token.blacklist()
            return JsonResponse({
                'success': 'true',
                'message': 'Password reset successful',
            }, status=200)
        except ( InvalidToken, TokenError ):
            return JsonResponse({'error': 'Invalid Token. Used once already!'}, status=200)
    
    except ( ValueError, User.DoesNotExist):
        return JsonResponse({'error': 'Invalid request'}, status=400)
    
class ProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfileSerializer

    def get(self, request):
        user: User = request.user

        profile = user.get_profile()
        profile_serialized = ProfileSerializer(profile)
        return Response(profile_serialized.data)
    

    # /**
    #  * Edit Profile Information
    #  * updateField=1 --> change name
    #  * updateField=2 --> comfirm old password and change to new password
    #  * updateField=3 --> update display settings
    #  */
    def put(self, request):
        user: User = request.user
        profile = user.get_profile()

        # get info from endpoint, if there then para exist, if not undefined
        updateField = request.query_params.get('updateField')
        name_str = request.query_params.get('name')
        old_password = request.query_params.get('confirmPassword')
        new_password = request.query_params.get('resetPassword')
        theme_str = request.query_params.get('theme')
        # fontsize_str = request.query_params.get('fontsize')
       
        if int(updateField) == 1:
            user.name = name_str
            user.save()
            return JsonResponse({"message": "name changed"})
        
        if int(updateField) == 2:
            if not user.check_password(old_password):
                return JsonResponse({"error": "Wrong old password!"})
            # please remember to check the length of the password in the frontend
            user.set_password(new_password)
            user.save()
            return JsonResponse({"success": "password changed"})

        if int(updateField) == 3:
            # need to call the get request again after doing this and refresh the profile context so that can update the page changes
            profile.theme = theme_str
            # profile.font_size = fontsize_str
            profile.save()
            return JsonResponse({"message": "success"})
        
        if int(updateField) == 4:
            data = request.data
            url = upload_file(data.get("avatar"), "profile-pictures", "user.png")
            profile.profile_picture = url
            profile.save()
            return JsonResponse({"message": "Profile Image Uploaded."})


        return JsonResponse({"message": "This is setProfile view"})
    


@api_view(['POST'])
@permission_classes([AllowAny])
def feedback(request):
    subject = request.data.get('subject')
    content = request.data.get('content')

    send_mail(
        f'Feedback from CashFlow: {subject}',
        f'Dear Developer, below is the feedback from CashFlow user:\n\n{content}\n',
        settings.DEFAULT_FROM_EMAIL,
        ['jqm002@hotmail.com', 'tanjiajun2002@gmail.com'],
        fail_silently=False,
    )

    return JsonResponse({
        'success': 'true',
        'message': 'Feedback sent',
    }, status=200)
    