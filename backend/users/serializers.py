from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom fields
        data['name'] = self.user.name

        return data

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ("id", 'name', 'email', 'password',
                  'is_active', 'is_staff', 'is_superuser')
        # fields = ('name', 'email', 'password',
        #           'active', 'is_staff', 'admin')