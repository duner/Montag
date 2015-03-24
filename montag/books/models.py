from django.contrib.postgres.fields import IntegerRangeField
from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=250, blank=True, null=True)
    author = models.ForeignKey('Author', blank=True, null=True, related_name='books')
    genre = models.ForeignKey('Genre', blank=True, null=True, related_name='books')
    rating = IntegerRangeField(default=(0,5))

    def __unicode__():
        return self.title


class Author(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True)

    def __unicode__():
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=250, blank=True, null=True)

    def __unicode__():
        return self.name



