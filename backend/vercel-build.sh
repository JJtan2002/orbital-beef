#!/bin/sh

# Install dependencies
echo "Install dependencies..."
python3 -m pip install -r requirements.txt

# Apply migrations
echo "Django managements..."
python3 manage.py makemigrations
python3 manage.py migrate
