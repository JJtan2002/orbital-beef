from django.urls import path
from .views import WatchlistAPIView, StockDataAPIView

urlpatterns = [
    path('watchlist/', WatchlistAPIView.as_view(), name='watchlist'),
    path('watchlist/<int:watchlist_pk>', WatchlistAPIView.as_view(), name='watchlist'),
    path('stockdata/', StockDataAPIView.as_view(), name='stockdata'),
    path('stockdata/<int:stock_data_pk>/', StockDataAPIView.as_view(), name='stockdata-detail'),
]