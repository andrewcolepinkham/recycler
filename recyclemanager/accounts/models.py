from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

from submissions.models import Submission

# Create your models here.




class Account(models.Model): 
    user = models.OneToOneField(User, on_delete=CASCADE)
    username = models.CharField(max_length=150,blank=True)
    score = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    profile_photo = models.ImageField(default= '../media/default.jpg', upload_to="post_images" )
    num_submissions = models.IntegerField(default=0)
    email = ""
    password = ""

    def create(self, user, username, profile_photo): 
        self.username = username
        self.score = 0
        self.num_submissions = 0
        self.user = user
        return self
    def delete_score_and_submission(self, score_decrease): 
        self.score = self.score- score_decrease
        self.num_submissions -= 1
    def update_score(self, score_increase): 
        self.score= self.score + score_increase
    def check_score(self): 
        self.score = 0
        for sub in self.user.submissions.all(): 
            self.score += sub.get_score()
        self.num_submissions = len(self.user.submissions.all())
        self.save(update_fields=["score"]) 
        self.save(update_fields=["num_submissions"]) 
    def get_score(self): 
        return self.score
    def add_num_submission(self): 
        self.num_submissions +=1
    def set_num_submissions(self, num): 
        self.num_submissions = num
    def get_num_submissions(self): 
        return self.num_submissions
    def __str__(self) -> str:
        return self.username
    def get_community(self): 
        return self.community_set.all()
class Community(models.Model): 
    zip_code = models.IntegerField(default=0)
    name = models.CharField(max_length=150,blank=True)
    accounts= models.ManyToManyField(Account,  through="Membership")    

    name2 = models.CharField(max_length=150,blank=True)
    def create(self, name, zip_code ): 
        self.name = name 
        self.zip_code=zip_code
        return self
# from django.db import models
# from django.contrib.auth.models import User
# from django.db.models.deletion import CASCADE

# from submissions.models import Submission
# #from .models import Community
# # Create your models here.

# class Community(models.Model): 
#     zip_code = models.IntegerField(default=0)
#     name = models.CharField(max_length=150,blank=True)
#     #admin = models.OneToOneField(User, on_delete=CASCADE)
#     #accounts= models.ManyToManyField(Account, through="Membership")    


#     def create(self, name, zip_code ): 
#         self.name = name 
#         self.zip_code=zip_code
#         return self
    
# class Account(models.Model): 
#     user = models.OneToOneField(User, on_delete=CASCADE)
#     username = models.CharField(max_length=150,blank=True)
#     score = models.DecimalField(max_digits=6, decimal_places=2, default=0)
#     profile_photo = models.ImageField(default= '../media/default.jpg', upload_to="post_images" )
#     num_submissions = models.IntegerField(default=0)
#     heloo = models.IntegerField(default=0)


#     communities = models.ManyToManyField(Community)    


#     email = ""
#     password = ""

#     def create(self, user, username, profile_photo): 
#         self.username = username
#         self.score = 0
#         self.num_submissions = 0
#         self.user = user
#        # self.communities.set(communities)
#         return self
#     def delete_score_and_submission(self, score_decrease): 
#         self.score = self.score- score_decrease
#         self.num_submissions -= 1
#     def update_score(self, score_increase): 

#         self.score= self.score + score_increase
#     def check_score(self): 
#         self.score = 0
#         for sub in self.user.submissions.all(): 
#             self.score += sub.get_score()
#         self.num_submissions = len(self.user.submissions.all())
#         self.save(update_fields=["score"]) 
#         self.save(update_fields=["num_submissions"]) 
#     def get_score(self): 
#         return self.score
#     def add_num_submission(self): 
#         self.num_submissions +=1
#     def set_num_submissions(self, num): 
#         self.num_submissions = num
#     def get_num_submissions(self): 
#         return self.num_submissions
#     def __str__(self) -> str:
#         return self.username


class Membership(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, default="", db_constraint=False)
    community = models.ForeignKey(Community, on_delete=models.CASCADE, default="", db_constraint=False)
    def create(self, account = account, community = community ): 
        self.community = community
        self.account= account
    def __str__(self) -> str:
        return self.username

