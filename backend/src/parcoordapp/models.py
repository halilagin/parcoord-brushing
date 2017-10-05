from django.db import models
import datetime
import django.utils

# Create your models here.

class ParCoordUserInteractionModel(models.Model):
    userName = models.CharField(max_length = 250)
    personName = models.CharField(max_length = 500)
    testName = models.CharField(max_length = 500, default="mytest")
    testPlace = models.CharField(max_length = 500,default="mytest")
    testDate = models.DateField(default=django.utils.timezone.now)
    testDescription=models.CharField(max_length = 500,default="mytest")
    dummy =  models.CharField(max_length = 500,default="mytest")
    
    data = models.TextField()
    
    def __str__(self):
        return self.userName + " - " + self.personName