# Generated by Django 3.2.9 on 2021-12-05 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submissions', '0007_submission_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='submission',
            name='photo',
            field=models.ImageField(default=0, upload_to='submissions/images/'),
        ),
    ]