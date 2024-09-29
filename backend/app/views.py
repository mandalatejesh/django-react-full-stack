from django.shortcuts import render
from django.http import FileResponse

from rest_framework import viewsets, status
from .serializers import QuestionSerializer, CustomUserSerializer
from .models import User, Question

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
import logging
logger = logging.getLogger('app')

class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)


class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_email = request.GET.get('user', None)
        logger.info(f"fetching username for {user_email}")
        if not user_email:
            user_email = request.user.email
        user = User.objects.filter(email=user_email).first()
        return Response({'name': user.name})

class ProfilePictureView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        user_email = request.GET.get('user', None)
        if not user_email:
            user_email = request.user.email

        try:
            # Fetch the user using the provided email
            user = User.objects.filter(email=user_email).first()
            if not user or not hasattr(user, 'profile_picture'):
                return Response({"detail": "User or profile not found."}, status=404)
            
            profile_picture = user.profile_picture  # Assuming profile_picture is an ImageField in a related model
            if profile_picture:
                return FileResponse(profile_picture.open(), content_type='image/png')
            else:
                return Response({"detail": "No profile picture found."}, status=404)
        
        except Exception as e:
            logger.error(f"Error fetching profile picture: {e}")
            return Response({"detail": "An error occurred."}, status=500)
        

class QuestionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        serializer = QuestionSerializer(data=data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        serializer = QuestionSerializer(Question.objects.all(), many=True) 
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateUserView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)