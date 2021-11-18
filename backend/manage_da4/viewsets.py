from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from api_da4.models import Course, Chapter, Lesson, Content
from api_da4.serializers.shorts import (
    ChapterShortSerializer,
    LessonShortSerializer,
    ContentShortSerializer,
)

from .serializers.base import BaseManageCourseSerializer
from .serializers.details import (
    ManageCourseSerializer,
    ManageChapterSerializer,
    ManageLessonSerializer,
    ManageContentSerializer,
)


class BaseListMixin:
    serializer_list_class = None

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.serializer_list_class(queryset, many=True)
        return Response(serializer.data)


class BaseManageViewSet(BaseListMixin, ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]


class ManageCourseViewSet(BaseManageViewSet):
    serializer_class = ManageCourseSerializer
    queryset = Course.objects.all()
    serializer_list_class = BaseManageCourseSerializer


class ManageChapterViewSet(BaseManageViewSet):
    serializer_class = ManageChapterSerializer
    serializer_list_class = ChapterShortSerializer
    queryset = Chapter.objects.all()


class ManageLessonViewSet(BaseManageViewSet):
    serializer_class = ManageLessonSerializer
    serializer_list_class = LessonShortSerializer
    queryset = Lesson.objects.all()


class ManageContentViewSet(BaseManageViewSet):
    serializer_class = ManageContentSerializer
    serializer_list_class = ContentShortSerializer
    queryset = Content.objects.all()
