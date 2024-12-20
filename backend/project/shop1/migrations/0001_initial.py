# Generated by Django 5.1.2 on 2024-11-03 01:40

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rachunki',
            fields=[
                ('id_rachunku', models.AutoField(primary_key=True, serialize=False)),
                ('data_wystawienia', models.DateField()),
                ('liczba_towarow', models.IntegerField()),
                ('laczna_cena', models.IntegerField()),
            ],
            options={
                'db_table': 'rachunki',
            },
        ),
        migrations.CreateModel(
            name='Towary',
            fields=[
                ('id_towaru', models.AutoField(primary_key=True, serialize=False)),
                ('nazwa_towaru', models.CharField(max_length=255, unique=True)),
                ('jednostka', models.CharField(max_length=255)),
                ('liczba', models.IntegerField()),
                ('cena_bez_vat', models.IntegerField()),
                ('vat', models.IntegerField()),
            ],
            options={
                'db_table': 'towary',
            },
        ),
        migrations.CreateModel(
            name='Faktury',
            fields=[
                ('id_faktury', models.AutoField(primary_key=True, serialize=False)),
                ('nip', models.IntegerField()),
                ('id_rachunku', models.ForeignKey(db_column='id_rachunku', on_delete=django.db.models.deletion.DO_NOTHING, to='shop1.rachunki')),
            ],
            options={
                'db_table': 'faktury',
            },
        ),
        migrations.CreateModel(
            name='Sprzedaze',
            fields=[
                ('id_sprzedazy', models.AutoField(primary_key=True, serialize=False)),
                ('liczba', models.IntegerField()),
                ('laczna_cena', models.IntegerField()),
                ('id_rachunku', models.ForeignKey(db_column='id_rachunku', on_delete=django.db.models.deletion.DO_NOTHING, to='shop1.rachunki')),
                ('id_towaru', models.ForeignKey(db_column='id_towaru', on_delete=django.db.models.deletion.DO_NOTHING, to='shop1.towary')),
            ],
            options={
                'db_table': 'sprzedaze',
            },
        ),
        migrations.CreateModel(
            name='Dostawy',
            fields=[
                ('id_dostawy', models.AutoField(primary_key=True, serialize=False)),
                ('data_dostawy', models.DateField()),
                ('liczba', models.IntegerField()),
                ('id_towaru', models.ForeignKey(db_column='id_towaru', on_delete=django.db.models.deletion.DO_NOTHING, to='shop1.towary')),
            ],
            options={
                'db_table': 'dostawy',
            },
        ),
        migrations.CreateModel(
            name='Usuniecia',
            fields=[
                ('id_usuniecia', models.AutoField(primary_key=True, serialize=False)),
                ('liczba', models.IntegerField()),
                ('data_usuniecia', models.DateField()),
                ('id_towaru', models.ForeignKey(db_column='id_towaru', on_delete=django.db.models.deletion.DO_NOTHING, to='shop1.towary')),
            ],
            options={
                'db_table': 'usuniecia',
            },
        ),
    ]
