from .models import Course, Chapter, Lesson
from rest_framework.serializers import ModelSerializer;


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'


class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

