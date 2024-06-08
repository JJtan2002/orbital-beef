from django.db import models
<<<<<<< HEAD
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
=======
from django.contrib.auth.models import AbstractUser, UserManager


# Create your models here.
class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    phone = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=63, null=True)
>>>>>>> 1dc75ee18fa08cb48f6b971e52a4bbafce67063d

    class Mata:
        verbose_name = 'user'
        verbose_name_plural = 'users'
    def __str__(self):
        return self.username
    
    REQUIRED_FIELDS = ['email']


class CustomUserManager(UserManager):
    pass

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50, default='Anonymous')
    email = models.EmailField(max_length=100, unique=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # session_token = models.CharField(max_length=10, default=0)
    session_token = models.CharField(blank=True, null=True, max_length=400)

    active = models.BooleanField(default=True)
    # a admin user; non super-user
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  # a superuser

    created_at = models.DateTimeField(
        auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
