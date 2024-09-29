from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission, BaseUserManager, AbstractBaseUser, PermissionsMixin


class MyUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=50)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Add related_name to resolve reverse accessor clashes
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',  # Custom related_name to avoid conflict
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',  # Custom related_name to avoid conflict
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = MyUserManager()

    def __str__(self):
        return self.email

class Question(models.Model):
    title = models.CharField(max_length=512)
    description = models.CharField(max_length=4098)
    user = models.ForeignKey(User, related_name="questions", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
