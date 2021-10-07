from .generics import CourseSerializer, ChapterSerializer, LessonSerializer
from .shorts import ChapterShortSerializer, ContentShortSerializer, LessonShortSerializer


class ChapterShortDetail(ChapterShortSerializer):
    lessons = LessonShortSerializer(many=True, read_only=True)

    class Meta(ChapterShortSerializer.Meta):
        fields = ChapterShortSerializer.Meta.fields + ['lessons']


class CourseDetailSerializer(CourseSerializer):
    chapters = ChapterShortDetail(many=True, read_only=True)

    class Meta(CourseSerializer.Meta):
        fields = CourseSerializer.Meta.fields + ['chapters']


class ChapterDetailSerializer(ChapterSerializer):
    lessons = LessonShortSerializer(many=True, read_only=True)
    
    class Meta(ChapterSerializer.Meta):
        fields = ChapterSerializer.Meta.fields + ['lessons']


class LessonsDetailSerializer(LessonSerializer):
    contents = ContentShortSerializer(many=True, read_only=True)

    class Meta(LessonSerializer.Meta):
        fields = LessonSerializer.Meta.fields + ['contents']
