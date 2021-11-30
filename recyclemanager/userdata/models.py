
# Create your models here.
from django.db import models

class User(models.Model):
  username = models.CharField(max_length=100)
  email = models.EmailField(max_length=100, unique=True)
  address = models.CharField(max_length=500, blank=True)
  password = models.CharField(max_length=500, blank=True)

  created_at = models.DateTimeField(auto_now_add=True)