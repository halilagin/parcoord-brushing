# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-10-05 16:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parcoordapp', '0002_auto_20171005_1649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='parcoorduserinteractionmodel',
            name='testDescription',
            field=models.CharField(default='mytest', max_length=500),
        ),
        migrations.AlterField(
            model_name='parcoorduserinteractionmodel',
            name='testName',
            field=models.CharField(default='mytest', max_length=500),
        ),
        migrations.AlterField(
            model_name='parcoorduserinteractionmodel',
            name='testPlace',
            field=models.CharField(default='mytest', max_length=500),
        ),
    ]
