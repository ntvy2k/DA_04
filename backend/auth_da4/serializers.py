from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class BaseUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email']


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = BaseUserSerializer.Meta.fields + ['username']
        read_only_fields = ['username']


class CreateUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
    

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
