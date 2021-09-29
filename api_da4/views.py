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
        pass


class UserLoginView(APIView):
    def post(self, request):
        pass


class UserLogoutView(APIView):
    def get(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"user": "logout"})
        except:
            return Response({"user": "logout"})
