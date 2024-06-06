from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


# Create your models here.
class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=63, null=True)

    class Mata:
        verbose_name = 'user'
        verbose_name_plural = 'users'
    def __str__(self):
        return self.username
    
    REQUIRED_FIELDS = ['email']


class CustomUserManager(UserManager):
    pass

class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=63)

    def __str__(self) -> str:
        return self.name
