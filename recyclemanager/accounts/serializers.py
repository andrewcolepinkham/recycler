from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Account

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
    # def update(self, instance, validated_data): 
    #     account_data = validated_data.pop('account')
    #     account = instance.account
    #     print("update")
    #     print(account.username)
    #     return instance
# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        #validated_data['score'] = 0
        user =     User.objects.create_user(
            **validated_data
        )
        username = validated_data['username']
        profile = Account.objects.create(user=user,username=username)
        user.set_password(validated_data['password'])
        return  user, profile

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
  
    def validate(self, data):
        user = authenticate(**data)
        try: 
            account = user.account
        except: 
            account = Account.objects.create(user=user,username=user.get_username())


        if user and user.is_active:
            return user, account
        raise serializers.ValidationError("Incorrect Credientials")

