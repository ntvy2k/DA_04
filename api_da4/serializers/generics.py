from api_da4.models import Course, Chapter, Lesson, Content
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, StringRelatedField


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'author', 'created_at', 'last_modified']


class ChapterFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Course.objects.filter(id=self.context['course'])
        return queryset


class ChapterSerializer(ModelSerializer):
    course = ChapterFilteredPrimaryKeyRelatedField()
    lessons = StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Chapter
        fields = ['id', 'name', 'created_at', 'last_modified', 'course', 'lessons']


class LessonFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Chapter.objects.filter(id=self.context['chapter'])
        return queryset


class LessonSerializer(ModelSerializer):
    chapter = LessonFilteredPrimaryKeyRelatedField()
    contents = StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = ['id', 'name', 'created_at', 'last_modified', 'chapter', 'contents']


class ContentFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        return Lesson.objects.filter(id=self.context['lesson'])


class ContentSerializer(ModelSerializer):
    lesson = ContentFilteredPrimaryKeyRelatedField()

    class Meta:
        model = Content
        fields = ['id', 'lesson', 'title', 'content']
