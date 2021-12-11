from django.db import models
from django.contrib.auth.models import User
from .calculate_scores import score_calculator

# Create your models here.

class Submission(models.Model):
    description = models.CharField(max_length=500, blank=False)
    type = models.CharField(max_length=50, blank=False)
    amount = models.FloatField(  default=0)
    photo = models.ImageField(upload_to="post_images", default=0, )
    owner = models.ForeignKey(User, related_name="submissions", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
   # score =  models.DecimalField(max_digits=6, decimal_places=2, default=0)
    def get_score(self): 
        return score_calculator(self.type, self.amount)


