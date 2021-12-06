from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.


class Account(models.Model): 
    user = models.OneToOneField(User, on_delete=CASCADE)
    username = models.CharField(max_length=150,blank=True)
    score = 0
    password = ''
    email =""

    def create(self, user, username): 
        self.username = username
        self.score = 0
        self.user = user
        return self
    def update_score(self, score_increase): 
        self.score += score_increase
        

