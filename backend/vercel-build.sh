#!/bin/sh

# Create dist directory if it doesn't exist
if [ ! -d "dist" ]; then
  mkdir dist
fi

# Install dependencies
echo "Install dependencies..."
python3 -m pip install -r requirements.txt

# Apply migrations
echo "Apply Django migrations..."
python3 manage.py makemigrations
python3 manage.py migrate

# Collect static files (if applicable)
echo "Collect static files..."
python3 manage.py collectstatic --noinput

# Optional: Build frontend assets (if applicable)
# echo "Build frontend assets..."
# npm install  # Example for Node.js frontend
# npm run build

# Copy necessary files to dist directory
echo "Copying files to dist directory..."
cp -r cashflow/* dist/

# Optionally, remove unnecessary files if needed
# rm -rf dist/*.py   # Example: remove Python files if only needed during build

echo "Build process completed."