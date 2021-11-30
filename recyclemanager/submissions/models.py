from django.db import models

# Create your models here.

class Submission(models.Model):
    comment = models.CharField(max_length=500, blank=False)
    amount = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    photo = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)