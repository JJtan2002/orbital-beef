from django.urls import path
from .views import WatchlistAPIView

urlpatterns = [
    path('', get_routes),
    path('watchlist/', WatchlistAPIView.as_view(), name='watchlist'),
    path('watchlist/<int:watchlist_pk>', WatchlistAPIView.as_view(), name='watchlist'),
]