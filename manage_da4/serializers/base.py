from api_da4.serializers.shorts import (
    CourseShortSerializer,
)


class BaseManageCourseSerializer(CourseShortSerializer):
    class Meta(CourseShortSerializer.Meta):
        fields = ["id", "name"]
