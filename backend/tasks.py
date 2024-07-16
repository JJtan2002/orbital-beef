from celery import shared_task
import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from backend.models import StockData

API_KEY = 'your_api_key'
STOCKS = ['AAPL', 'MSFT', 'GOOGL']  # Top 25 by market cap in S&P 500

# PostgreSQL database configuration
DATABASE_URI = 'postgresql://username:password@localhost:5432/yourdatabase'
engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)
session = Session()

@shared_task
def fetch_stock_data():
    for ticker in STOCKS:
        response = requests.get(f'https://api.example.com/stock/{ticker}/quote', params={'api_key': API_KEY})
        data = response.json()
        close_price = data['close']
        date = datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S')

        stock_data = StockData(
            id=f'{ticker}_{date}',
            ticker=ticker,
            close_price=close_price,
            date=date
        )
        
        session.merge(stock_data)
    session.commit()
