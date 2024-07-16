from celery import shared_task
import requests
from datetime import datetime
from .models import StockData

API_KEY = 'your_api_key'
STOCKS = ['AAPL', 'MSFT', 'GOOGL']  # Top 25 by market cap in S&P 500

@shared_task
def fetch_stock_data():
    for ticker in STOCKS:
        response = requests.get(f'https://api.example.com/stock/{ticker}/quote', params={'api_key': API_KEY})
        data = response.json()
        close_price = data['close']
        date = datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S')

        stock_data, created = StockData.objects.update_or_create(
            id=f'{ticker}_{date}',
            defaults={
                'ticker': ticker,
                'close_price': close_price,
                'date': date,
            },
        )