from rest_framework import serializers
<<<<<<< HEAD
from django.contrib.auth.hashers import make_password
from .models import User


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

=======
from .models import User, Token, CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'country', 'phone', 'is_active')
        
class UserSerializer(serializers.ModelSerializer):
>>>>>>> 1dc75ee18fa08cb48f6b971e52a4bbafce67063d
    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ("id", 'name', 'email', 'password',
                  'is_active', 'is_staff', 'is_superuser')
        # fields = ('name', 'email', 'password',
        #           'active', 'is_staff', 'admin')