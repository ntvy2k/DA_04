from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token 
from rest_framework import status

from .serializers import UserBaseSerializer


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
    def delete(self, request):
        try:
            user = User.objects.get(id=request.data['data']['id'])
            token = Token.objects.get(user=user)
            token.delete()
            return Response(status.HTTP_202_ACCEPTED)
        except:
            return Response(status.HTTP_202_ACCEPTED)


class UserProfileView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user = request.user
            serializer = UserBaseSerializer(user)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
