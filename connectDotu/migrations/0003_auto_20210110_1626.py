# Generated by Django 2.2.12 on 2021-01-10 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connectDotu', '0002_game'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='number_of_members',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='game',
            name='start',
            field=models.BooleanField(default=False),
        ),
    ]
