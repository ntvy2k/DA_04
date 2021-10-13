from api_da4.models import Course, Chapter, Lesson, Content, CourseGroup, CourseTopic, CourseIcon
from .shorts import ChapterShortSerializer, LessonShortSerializer, CourseShortSerializer
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField


class CourseIconSerializer(ModelSerializer):
    class Meta:
        model = CourseIcon
        fields = '__all__'


class CourseGroupSerializer(ModelSerializer):
    gr_courses = CourseShortSerializer(many=True, read_only=True)

    class Meta:
        model = CourseGroup
        fields = '__all__'


class CourseTopicSerializer(ModelSerializer):
    tp_courses = CourseShortSerializer(many=True, read_only=True)

    class Meta:
        model = CourseTopic
        fields = '__all__'


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'author', 'created_at', 'last_modified', 'slug'] + ['group', 'topics'] + ['icon']
        lookup_field = 'slug'
        read_only_fields = ['slug', 'author']


class ChapterFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        queryset = Course.objects.filter(slug=self.context['course'])
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
