# Generated by Django 3.2.10 on 2021-12-09 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0016_auto_20211209_2322'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account1',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]