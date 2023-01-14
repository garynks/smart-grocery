from django.db import models
from list.models import List

class Item(models.Model):
    itemName = models.CharField(primary_key=True, max_length=200)
    quantity = models.IntegerField(default=1)
    category = models.CharField(default='', max_length=200)
    list = models.ForeignKey(List, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.itemName
