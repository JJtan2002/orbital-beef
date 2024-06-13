from rest_framework import routers
from django.urls import path, include


from . import views

router = routers.DefaultRouter()
router.register(r'', views.UserViewSet)

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('', include(router.urls)),
]