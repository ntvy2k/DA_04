from .base import BaseManageCourseSerializer
from api_da4.serializers.shorts import (
    ChapterShortSerializer,
    LessonShortSerializer,
    ContentShortSerializer,
)


class ManageCourseSerializer(BaseManageCourseSerializer):
    class Meta(BaseManageCourseSerializer.Meta):
        fields = "__all__"


class ManageChapterSerializer(ChapterShortSerializer):
    class Meta(ChapterShortSerializer.Meta):
        fields = "__all__"


class ManageLessonSerializer(LessonShortSerializer):
    class Meta(LessonShortSerializer.Meta):
        fields = "__all__"


class ManageContentSerializer(ContentShortSerializer):
    class Meta(ContentShortSerializer.Meta):
        fields = "__all__"
