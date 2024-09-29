from rest_framework import serializers
from app.models import User, Question
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'is_active', 'is_staff', 'profile_picture']

    def create(self, validated_data):
        user = User(
            name=validated_data['name'],
            email=validated_data['email'],
            is_active=validated_data.get('is_active', True),
            is_staff=validated_data.get('is_staff', False)
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
    
class QuestionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  
    
    class Meta:
        model = Question
        fields = ['title', 'description', 'user']  
        read_only_fields = ['user']  # user field is read-only

    def create(self, validated_data):
        user = self.context['request'].user
        question = Question.objects.create(user=user, **validated_data)
        return question



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
