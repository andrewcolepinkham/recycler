from rest_framework import serializers
from submissions.models import Submission
from accounts.models import Account

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'
    
    
class SubmissionUserUpdateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Submission
        fields = '__all__'
        
    def create(self, validated_data): 
        print("SubmissionUserUpdateSerializer")

        pass