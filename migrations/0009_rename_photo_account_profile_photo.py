# Generated by Django 3.2.9 on 2021-12-08 23:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_rename_amount_account_score'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='photo',
            new_name='profile_photo',
        ),
    ]