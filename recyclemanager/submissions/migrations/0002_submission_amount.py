# Generated by Django 3.2.9 on 2021-11-30 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submissions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]
