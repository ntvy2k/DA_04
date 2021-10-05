from api_da4.models import Course, Chapter, Lesson, Content
from .shorts import ChapterShortSerializer, LessonShortSerializer
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'author', 'created_at', 'last_modified']


class ChapterFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Course.objects.filter(id=self.context['course'])
        return queryset


class ChapterSerializer(ChapterShortSerializer):
    course = ChapterFilteredPrimaryKeyRelatedField()

    class Meta(ChapterShortSerializer.Meta):
        fields = ChapterShortSerializer.Meta.fields + ['created_at', 'last_modified', 'course']


class LessonFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Chapter.objects.filter(id=self.context['chapter'])
        return queryset


class LessonSerializer(LessonShortSerializer):
    chapter = LessonFilteredPrimaryKeyRelatedField()

    class Meta(LessonShortSerializer.Meta):
        fields = LessonShortSerializer.Meta.fields + ['created_at', 'last_modified', 'chapter']


class ContentFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        return Lesson.objects.filter(id=self.context['lesson'])


class ContentSerializer(ModelSerializer):
    lesson = ContentFilteredPrimaryKeyRelatedField()

    class Meta:
        model = Content
        fields = ['id', 'lesson', 'title', 'content']
