# Generated by Django 3.2.9 on 2021-12-05 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submissions', '0005_auto_20211205_2014'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
    ]