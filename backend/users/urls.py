from rest_framework import routers
from django.urls import path, include

from . import views
from .views import ProfileAPIView


urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('verify/', views.verification, name="verification"),
    path('forgotPassword/', views.forgetpassword, name="forgetpassword"),
    path('resetPassword/', views.resetPassword, name="resetPassword"),
    path('profile/', ProfileAPIView.as_view(), name='profile'),
    path('feedback/', views.feedback, name='feedback'),
]