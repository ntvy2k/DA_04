from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token 
from rest_framework import status

from .serializers import UserBaseSerializer


class UserRegisterView(APIView):
    def post(self, request):
        info = request.data
        if not User.objects.filter(username=info['username']).exists():
            if not User.objects.filter(email=info['email']).exists():
                user = User()
                user.first_name = info['first_name']
                user.last_name = info['last_name']
                user.username = info['username']
                user.email = info['email']
                user.set_password(info['password'])
                user.save()
                return Response({"success": "register success"})
            return Response({"error": "email already exists."})
        return Response({"error": "username already exists."})


class UserLoginView(APIView):
    def post(self, request):
        info = request.data
        try:
            user = User.objects.get(username=info['username'])
            if user.check_password(info['password']):
                token = Token.objects.get_or_create(user=user)[0]
                return Response({"access": token.key})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    def delete(self, request):
        try:
            user = User.objects.get(id=request.data['id'])
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
