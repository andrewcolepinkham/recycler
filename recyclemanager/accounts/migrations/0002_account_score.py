# Generated by Django 3.2.9 on 2021-12-06 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='score',
            field=models.FloatField(default=0),
        ),
    ]