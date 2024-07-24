#!/bin/sh

# Install dependencies
echo "Install dependencies..."
python3 -m pip install -r requirements.txt

# Create the dist directory if it doesn't exist
mkdir -p dist

# # Add debug info
# echo "Creating output files in dist..."

# # Example: copying files to dist
# cp -r your-source-directory/* dist/

# # Check the contents of dist
# ls -la dist

# Apply migrations
echo "Django managements..."
python3 manage.py makemigrations
python3 manage.py migrate
