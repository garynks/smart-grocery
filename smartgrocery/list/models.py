from django.db import models

class List(models.Model):
    listName = models.CharField(primary_key=True, max_length=200)

    def __str__(self):
        return self.listName
