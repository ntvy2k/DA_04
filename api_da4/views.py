from rest_framework.response import Response
from .models import Course, Chapter, Lesson
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token 


class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class ChapterViewSet(ModelViewSet):
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()


class LessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer
    queryset = Lesson.objects.all()


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
                return Response({"Token": token.key})
            return Response({"error": "username or password wrong!!!"})
        except:
            return Response({"error": "username or password wrong!!!"})


class UserLogoutView(APIView):
    def get(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"user": "logout"})
        except:
            return Response({"user": "logout"})
