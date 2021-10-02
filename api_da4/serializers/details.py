from api_da4.models import Chapter
from rest_framework.serializers import ModelSerializer

from .generics import CourseSerializer


class ChapterSubListSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'name']


class CourseDetailSerializer(CourseSerializer):
    chapters = ChapterSubListSerializer(many=True, read_only=True)

    class Meta(CourseSerializer.Meta):
        fields = CourseSerializer.Meta.fields + ['chapters']
