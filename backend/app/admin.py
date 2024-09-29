from django.contrib import admin
from .models import User, Question
from django.contrib.auth.admin import UserAdmin

admin.site.register(User)
admin.site.register(Question)