import users.models
from django.db import models

class Watchlist(models.Model):
    user = models.ForeignKey(users.models.User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    entry_price = models.DecimalField(decimal_places=2, max_digits=15)

    def __str__(self):
        return f'{self.user.username} - {self.symbol}'
    
    @staticmethod
    def create_from_json(data: dict, user_pk: int):
        try:
            user: users.models.User = users.models.User.objects.get(pk=user_pk)
        except users.models.User.DoesNotExist:
            raise PermissionError()
        
        watchlist = Watchlist()
        watchlist.user = user

        if not data.get("ticker"):
            raise Exception("Ticker is required.")
        watchlist.symbol = data.get("ticker")

        if data.get("entry") is not None:
            watchlist.entry_price = data.get("entry")
        
        watchlist.save()

        return watchlist
    
class StockData(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    ticker = models.CharField(max_length=10)
    open_price = models.FloatField()
    close_price = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    change = models.FloatField()
    change_percent = models.CharField(max_length=10)
    date = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.ticker} - {self.date}"