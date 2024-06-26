from rest_framework import routers
from django.urls import path, include

from . import views


urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('verify/', views.verification, name="verification"),
    path('forgotPassword/', views.forgetpassword, name="forgetpassword"),
    path('resetPassword/', views.resetPassword, name="resetPassword"),
]