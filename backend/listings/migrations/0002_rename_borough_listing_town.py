# Generated by Django 4.0.1 on 2022-09-02 15:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='listing',
            old_name='borough',
            new_name='town',
        ),
    ]
