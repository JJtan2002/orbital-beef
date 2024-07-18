from rest_framework import serializers
from .models import Watchlist, StockData

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ['id', 'symbol', 'entry_price']

class StockDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockData
        fields = ['id', 'ticker', 'open_price', 'close_price', 'high', 'low', 'date', 'change', 'change_percent']