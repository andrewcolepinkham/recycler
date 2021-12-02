from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Submission(models.Model):
    comment = models.CharField(max_length=500, blank=False)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    photo = models.ImageField()
    owner = models.ForeignKey(User, related_name="submissions", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)