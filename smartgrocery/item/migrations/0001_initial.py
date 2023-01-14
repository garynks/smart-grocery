# Generated by Django 4.1.5 on 2023-01-14 19:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('list', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('itemName', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=1)),
                ('category', models.CharField(default='', max_length=200)),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='list.list')),
            ],
        ),
    ]