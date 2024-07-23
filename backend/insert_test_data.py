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
    {'ticker': 'AAPL', 'open_price': 150.0, 'high': 150.0, 'low': 150.0, 'close_price': 150.0, 'date': "2023-07-07", 'change': 0.0, 'change_percent': '0%'},
    {'ticker': 'MSFT', 'open_price': 150.0, 'high': 150.0, 'low': 150.0, 'close_price': 150.0, 'date': "2023-07-07", 'change': 0.0, 'change_percent': '0%'},
    {'ticker': 'GOOGL', 'open_price': 150.0, 'high': 150.0, 'low': 150.0, 'close_price': 150.0, 'date': "2023-07-07", 'change': 0.0, 'change_percent': '0%'},
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