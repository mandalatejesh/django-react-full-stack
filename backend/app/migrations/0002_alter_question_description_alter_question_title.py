# Generated by Django 5.1.1 on 2024-09-29 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='description',
            field=models.CharField(max_length=4098),
        ),
        migrations.AlterField(
            model_name='question',
            name='title',
            field=models.CharField(max_length=512),
        ),
    ]
