from celery import Celery
from celery.schedules import crontab

app = Celery('tasks', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')

app.conf.beat_schedule = {
    'fetch_stock_data': {
        'task': 'tasks.fetch_stock_data',
        'schedule': crontab(hour=0, minute=0),  # Adjust this based on your requirements
    },
}

app.conf.timezone = 'UTC +8'

if __name__ == '__main__':
    app.start()