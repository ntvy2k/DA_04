from .shorts import CourseShortSerializer
from .details import LessonsDetailSerializer


class CoursePublisherSerializer(CourseShortSerializer):
    class Meta(CourseShortSerializer.Meta):
        fields = ["id", "name", "status"]
        read_only_fields = ["name", "status"]


class LessonRearrangeSerializer(LessonsDetailSerializer):
    class Meta(LessonsDetailSerializer.Meta):
        fields = ["id", "name", "contents"]
        read_only_fields = ["name"]
