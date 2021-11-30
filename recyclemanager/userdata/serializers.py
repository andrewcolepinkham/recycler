from rest_framework import serializers
from userdata.models import User 

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User 
    fields = '__all__'