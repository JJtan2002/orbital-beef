@echo off
echo Starting build script...

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies.
    exit /b 1
)

REM Run Django management commands
echo Running Django management commands...
python manage.py makemigrations
IF %ERRORLEVEL% NEQ 0 (
    echo Makemigrations failed.
    exit /b 1
)

python manage.py migrate
IF %ERRORLEVEL% NEQ 0 (
    echo Migrate failed.
    exit /b 1
)

echo Build script completed successfully.

