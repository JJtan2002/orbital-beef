import users.models
from django.db import models

class Watchlist(models.Model):
    user = models.ForeignKey(users.models.User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    entry_price = models.DecimalField(decimal_places=2, max_digits=15)

    def __str__(self):
        return f'{self.user.username} - {self.symbol}'
    
    @staticmethod
    def create_from_json(data: dict, user_pk: int) -> 'CustomLabel':
        try:
            user: users.models.User = users.models.User.objects.get(pk=user_pk)
        except users.models.User.DoesNotExist:
            raise PermissionError()
        
        watchlist = Watchlist()
        watchlist.user = user

        if not data.get("symbol"):
            raise Exception("Ticker is required.")
        watchlist.symbol = data.get("symbol")

        if data.get("entry_price") is not None:
            watchlist.is_expense = data.get("entry_price")
        
        watchlist.save()

        return watchlist