from .models import Course, Chapter, Lesson, Content
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class ChapterFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Course.objects.filter(id=self.context['course'])
        return queryset


class ChapterSerializer(ModelSerializer):
    course = ChapterFilteredPrimaryKeyRelatedField()

    class Meta:
        model = Chapter
        fields = '__all__'


class LessonFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Chapter.objects.filter(id=self.context['chapter'])
        return queryset


class LessonSerializer(ModelSerializer):
    chapter = LessonFilteredPrimaryKeyRelatedField()

    class Meta:
        model = Lesson
        fields = '__all__'


class ContentFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        return Lesson.objects.filter(id=self.context['lesson'])


class ContentSerializer(ModelSerializer):
    lesson = ContentFilteredPrimaryKeyRelatedField()

    class Meta:
        model = Content
        fields = "__all__"
