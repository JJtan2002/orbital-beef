#!/bin/sh

# Install dependencies
echo "Install dependencies..."
pip install -r requirements.txt

# Apply migrations
echo "Django managements..."
python manage.py makemigrations
python manage.py migrate
