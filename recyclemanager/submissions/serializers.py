from rest_framework import serializers
from submissions.models import Submission
from accounts.models import Account

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'
    #     instance = Account.objects.update_score(1)
    #     account.save(update_fields=["score"]) 
    #     return account
class SubmissionUserUpdateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Account
        fields = ('points', "type")

    def update(self, validated_data): 
        account = Account.objects.update_score(1)
        account.save(update_fields=["score"]) 
        return account