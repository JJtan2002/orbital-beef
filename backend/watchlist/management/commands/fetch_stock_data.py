from django.core.management.base import BaseCommand
import requests
from watchlist.models import StockData

API_KEY = 'NBVT8WXYHNR8FKTB'
STOCKS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'BRK.B', 'XOM','JPM',
          'JNJ', 'V', 'PG', 'MA', 'AVGO', 'CVX', 'COST',
          'PEP', 'ADBE', 'NVDA', 'META', 'WMT'] 

class Command(BaseCommand):
    help = 'Fetch and update stock data'

    def handle(self, *args, **kwargs):
        for ticker in STOCKS:
            response = requests.get(f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={API_KEY}')

            if response.status_code == 200:
                data = response.json().get("Global Quote")
                if data:
                    open_price = data["02. open"]
                    low = data["04. low"]
                    high = data["03. high"]
                    close_price = data["05. price"]
                    date = data["07. latest trading day"]
                    change = data["09. change"]
                    change_percent = data["10. change percent"]

                    self.stdout.write(self.style.SUCCESS(f"Ticker: {ticker}, Date: {date}, Open: {open_price}, Low: {low}, High: {high}, Close: {close_price}, Change: {change}, Change Percent: {change_percent}"))

                    stock_data, created = StockData.objects.update_or_create(
                        id=f'{ticker}_{date}',
                        defaults={
                            'ticker': ticker,
                            'close_price': close_price,
                            'date': date,
                            'open_price': open_price,
                            'low': low,
                            'high': high,
                            'change': change,
                            'change_percent': change_percent,
                        },
                    )
                else:
                    self.stdout.write(self.style.WARNING(f"No data found for ticker {ticker}"))
            else:
                self.stdout.write(self.style.ERROR(f"Failed to fetch data for ticker {ticker}, status code: {response.status_code}"))