from celery import shared_task
import requests
from datetime import datetime
from .models import StockData

API_KEY = 'your_api_key'
STOCKS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'BRK.B', 'UNH', 'XOM', 'LLY', 'JPM',
          'JNJ', 'V', 'PG', 'MA', 'AVGO', 'HD', 'CVX', 'MRK', 'ABBV', 'COST',
          'PEP', 'ADBE', 'NVDA', 'META', 'WMT']  # Top 25 by market cap in S&P 500  # Top 25 by market cap in S&P 500

@shared_task
def fetch_stock_data():
    for ticker in STOCKS:
        response = requests.get(f'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={API_KEY}') #TODO: GET API KEY
        data = response.json()
        open_price = data["02. open"]
        low = data["04. low"]
        high = data["03. high"]
        close_price = data["05. price"]
        date = data["07. latest trading day"]
        change = data["09. change"]
        change_percent = data["10. change percent"]

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