from .shorts import CourseShortSerializer


class CoursePublisherSerializer(CourseShortSerializer):
    class Meta(CourseShortSerializer.Meta):
        fields = ["id", "name", "status"]
        read_only_fields = ["name", "status"]
