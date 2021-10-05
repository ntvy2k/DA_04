from api_da4.models import Course, Chapter, Lesson, Content

from rest_framework.serializers import ModelSerializer


class CourseShortSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name']


class ChapterShortSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'name']


class LessonShortSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'name']


class ContentShortSerializer(ModelSerializer):
    class Meta:
        model = Content
        fields = ['id', 'title']
