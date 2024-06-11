from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import QuerySet, Sum, F
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import budget_tracking.models

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

        # Creation of a related wallet for the created user
        wallet = budget_tracking.models.Wallet.objects.create(
            user_id=user.pk,
            current_amount=0
        )
        wallet.save()
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

    
    def get_wallet(self) -> 'Wallet':
        """
        Returns the wallet related to that user.
        """
        return budget_tracking.models.Wallet.objects.get(user_id=self.pk)

    def get_labels(self) -> QuerySet['CustomLabel']:
        """
        Return all CustomLabels related to that user
        """
        return self.get_wallet().get_labels()

    def get_name(self):
        """
        Returns the name of the user.
        """
        return self.name



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)