from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

# Create your models here.


class Account(models.Model): 
    user = models.OneToOneField(User, on_delete=CASCADE)
    username = models.CharField(max_length=150,blank=True)
    score = models.FloatField(default=0)
    num_submissions = models.IntegerField(default=0)
    email = ""
    password = ""

    def create(self, user, username): 
        self.username = username
        self.score = 0
        self.num_submissions = 0
        self.user = user
        return self
    def update_score(self, score_increase): 
        self.score= self.score + score_increase
    def get_score(self): 
        return self.score
    def add_num_submission(self): 
        self.num_submissions +=1
    def get_num_submissions(self): 
        return self.num_submissions
    def __str__(self) -> str:
        return self.username


