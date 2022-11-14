from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccountManager(BaseUserManager):
    def create_user(self, username, avatar, password=None):
        if not username:
            raise ValueError('User must have an username')

        if not avatar:
            raise ValueError('User must have an avatar')

        user = self.model(
            username=username,
            avatar=avatar
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, avatar, password):
        user = self.create_user(
            username=username,
            avatar=avatar,
            password=password
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    username = models.CharField(max_length=50, unique=True)
    avatar = models.CharField(max_length=200)

    # required
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superadmin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['avatar']

    objects = MyAccountManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True
