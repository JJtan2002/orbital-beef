#!/usr/bin.env bash

echo "Building project packaged..."
python -m pip install -r requirements.txt

echo "Migrate Database..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput