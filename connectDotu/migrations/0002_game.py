# Generated by Django 2.2.12 on 2021-01-10 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connectDotu', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('game_id', models.TextField(primary_key=True, serialize=False)),
                ('board', models.TextField()),
                ('dash_board', models.TextField()),
            ],
        ),
    ]
