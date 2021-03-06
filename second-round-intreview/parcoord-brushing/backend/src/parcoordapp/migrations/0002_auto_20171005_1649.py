# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-10-05 16:49
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('parcoordapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='parcoorduserinteractionmodel',
            name='testDate',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='parcoorduserinteractionmodel',
            name='testDescription',
            field=models.CharField(default=django.utils.timezone.now, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parcoorduserinteractionmodel',
            name='testName',
            field=models.CharField(default=django.utils.timezone.now, max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='parcoorduserinteractionmodel',
            name='testPlace',
            field=models.CharField(default=django.utils.timezone.now, max_length=500),
            preserve_default=False,
        ),
    ]
