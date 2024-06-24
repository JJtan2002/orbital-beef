# Generated by Django 5.0.6 on 2024-06-23 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_tracking', '0002_alter_transaction_update_wallet'),
    ]

    operations = [
        migrations.AddField(
            model_name='customlabel',
            name='current_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='customlabel',
            name='goal',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
        migrations.AddField(
            model_name='customlabel',
            name='is_monthly',
            field=models.BooleanField(default=True),
        ),
    ]
