# Generated by Django 3.2.9 on 2021-12-05 20:09

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('submissions', '0003_submission_owner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='submission',
            old_name='comment',
            new_name='description',
        ),
        migrations.AddField(
            model_name='submission',
            name='type',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='submission',
            name='photo',
            field=models.ImageField(upload_to='submissions/images'),
        ),
    ]