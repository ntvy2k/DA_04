from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token 
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import UserSerializer


class UserRegisterView(APIView):
    def post(self, request):
        data = request.data
        if not User.objects.filter(username=data['username']).exists():
            if not User.objects.filter(email=data['email']).exists():
                user = User()
                user.first_name = data['first_name']
                user.last_name = data['last_name']
                user.username = data['username']
                user.email = data['email']
                user.set_password(data['password'])
                user.save()
                return Response({"status": 0})  # Register: Successful
            return Response({"status": 2})      # Email already exists
        return Response({"status": 1})          # Username already exists


class UserLoginView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(username=data['username'])
            if user.check_password(data['password']):
                token = Token.objects.get_or_create(user=user)[0]
                return Response({"access": token.key})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        token = Token.objects.get(user=user)
        token.delete()
        return Response(status.HTTP_204_NO_CONTENT)


class OwnerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


    def put(self, request):
        serializer = UserSerializer(request.user, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data
        old_password = data['current_password']
        if user.check_password(old_password):
            user.set_password(data['new_password'])
            user.save()
            return Response(status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)
