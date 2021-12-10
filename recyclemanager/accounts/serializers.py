from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Account, Community

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
class CommunitySerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Community
        fields =(
            'name', 'zip'
        )
class CommunityCreationSerializer(serializers.Serializer): 
    class Meta: 
        model = Community
        fields =(
            'name', 'zip', 'admin_user'
        )
        def create(self, validated_data):
            community = Community.objects.create(name=validated_data["name"], zip_code=validated_data["zip"])
            return community
# User Serializer
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'id', 
            'username', 
            'email', 
            'score',
            'num_submissions', 
            'profile_photo'
        )



# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'], password=validated_data["password"], email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        return  user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
  
    def validate(self, data):
        user = authenticate(**data)
        try: 
            account = user.account
        except: 
            account = Account.objects.create(user=user,username=user.get_username(), profile_photo=None)


        if user and user.is_active:
            return user, account
        raise serializers.ValidationError("Incorrect Credientials")

class UpdateScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'score', "profile_photo")
    def update(self, instance, validated_data):
        print("update score")
        print(instance) 
        print(validated_data)

        instance.save()

        return instance
