import os
import django
from datetime import datetime

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cashflow.settings')
django.setup()

# Import models after setting up Django

from watchlist.models import StockData  # Adjusted import path

# Example data to insert
test_data = [
    {'ticker': 'AAPL', 'close_price': 150.0, 'date': datetime(2023, 7, 7)},
    {'ticker': 'MSFT', 'close_price': 280.0, 'date': datetime(2023, 7, 7)},
    {'ticker': 'GOOGL', 'close_price': 2700.0, 'date': datetime(2023, 7, 7)},
]

# Insert test data
for data in test_data:
    stock_data, created = StockData.objects.update_or_create(
        id=f"{data['ticker']}_{data['date']}",
        defaults={
            'ticker': data['ticker'],
            'close_price': data['close_price'],
            'date': data['date'],
        },
    )

print("Test data inserted successfully!")