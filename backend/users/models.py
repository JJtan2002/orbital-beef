from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models import QuerySet
import budget_tracking.models

class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )

        user.set_password(password)
        user.save(using=self._db)

        labels_data = [
            {"id": 0, "name": "Food", "color": "white", "is_monthly" : True},
            {"id": 1, "name": "Transportation", "color": "black", "is_monthly" : True},
            {"id": 2, "name": "Housing", "color": "white", "is_monthly" : True},
            {"id": 3, "name": "Utilities", "color": "black", "is_monthly" : True},
            {"id": 4, "name": "Entertainment", "color": "white", "is_monthly" : True},
            {"id": 5, "name": "Salary", "color": "black", "is_monthly" : True},
            {"id": 6, "name": "Freelance Income", "color": "white", "is_monthly" : True},
            {"id": 7, "name": "Investment", "color": "black", "is_monthly" : True},
            {"id": 8, "name": "Gifts", "color": "white", "is_monthly" : True},
            {"id": 9, "name": "Other", "color": "black", "is_monthly" : True},
        ]
        
        # Creation of a related wallet for the created user
        wallet = budget_tracking.models.Wallet.objects.create(
            user_id=user.pk,
            current_amount=0,
            )
        wallet.save()

        for label_data in labels_data:
            label = budget_tracking.models.CustomLabel.create_from_json(label_data, user.pk)
            label.save()
            
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            name='Admin',
            email=email,
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

