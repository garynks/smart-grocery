# Generated by Django 4.1.5 on 2023-01-14 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('listName', models.CharField(max_length=200, primary_key=True, serialize=False)),
            ],
        ),
    ]
