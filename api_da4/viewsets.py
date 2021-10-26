from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.permissions import (
    IsAuthenticated,
)
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin

from .permissions import (
    IsOwnerOrReadOnly,
    IsCourseOwner,
    ReadOnly,
)

from .models import (
    Course,
    Chapter,
    Lesson,
    Content,
    CourseGroup,
    CourseTopic,
    CourseIcon,
)
from .serializers.generics import (
    CourseSerializer,
    ChapterSerializer,
    LessonSerializer,
    ContentSerializer,
    CourseGroupSerializer,
    CourseTopicSerializer,
    CourseIconSerializer,
)
from .serializers.details import (
    CourseDetailSerializer,
    ChapterDetailSerializer,
    LessonsDetailSerializer,
)

# Read-Only ViewSets


class ReadOnlyBaseViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):
    """
    Read-Only Model ViewSet
    A viewset that provides default 'retrieve()' and 'list()' actions
    """

    permission_classes = [ReadOnly]


class CourseIconViewSet(ReadOnlyBaseViewSet):
    serializer_class = CourseIconSerializer
    queryset = CourseIcon.objects.all()


class CourseGroupViewSet(ReadOnlyBaseViewSet):
    serializer_class = CourseGroupSerializer
    queryset = CourseGroup.objects.all()


class CourseTopicViewSet(ReadOnlyBaseViewSet):
    serializer_class = CourseTopicSerializer
    queryset = CourseTopic.objects.all()


class CourseViewSet(ReadOnlyBaseViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all().filter(status="p")
    lookup_field = "slug"

    def retrieve(self, request, slug):
        instance = get_object_or_404(self.queryset.filter(), slug=slug)
        return Response(CourseDetailSerializer(instance).data)


class ChapterViewSet(ReadOnlyBaseViewSet):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        return Chapter.objects.filter(
            course__slug=self.kwargs["course_slug"], course__status="p"
        )

    def retrieve(self, request, *args, **kwargs):
        instance = get_object_or_404(self.get_queryset().filter(), pk=kwargs["pk"])
        serializer = ChapterDetailSerializer(instance)
        return Response(serializer.data)


class LessonViewSet(ReadOnlyBaseViewSet):
    serializer_class = LessonSerializer

    def get_queryset(self):
        return Lesson.objects.filter(
            chapter__course__slug=self.kwargs["course_slug"],
            chapter__course__status="p",
            chapter=self.kwargs["chapter_pk"],
        )

    def retrieve(self, request, *args, **kwargs):
        lesson = get_object_or_404(self.get_queryset().filter(), pk=kwargs["pk"])
        serializer = LessonsDetailSerializer(lesson)
        return Response(serializer.data)

    def list(self, request, course_slug, chapter_pk):
        get_object_or_404(
            Chapter.objects.filter(course__slug=course_slug, pk=chapter_pk)
        )
        return super().list(request)


class ContentViewSet(ReadOnlyBaseViewSet):
    serializer_class = ContentSerializer

    def get_queryset(self):
        return Content.objects.filter(
            lesson__chapter__course__slug=self.kwargs["course_slug"],
            lesson__chapter__course__status="p",
            lesson__chapter=self.kwargs["chapter_pk"],
            lesson=self.kwargs["lesson_pk"],
        )

    def list(self, request, course_slug, chapter_pk, lesson_pk):
        get_object_or_404(
            Lesson.objects.filter(
                chapter__course__slug=course_slug, chapter=chapter_pk, pk=lesson_pk
            )
        )
        return super().list(request)


# End Read-Only ViewSets

# Owner ViewSets <IsAuthenticated>


class OwnerCourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = "slug"
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def retrieve(self, request, slug):
        course = get_object_or_404(self.queryset.filter(owner=request.user), slug=slug)
        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)

    @action(
        detail=True,
        methods=["get", "put"],
        url_path="make-publish",
    )
    def make_publish(self, request, slug):
        instance = get_object_or_404(self.get_queryset().filter(slug=slug))
        serializer = CourseDetailSerializer(instance)
        if request.method == "PUT":
            instance.status = "p"
            instance.save()
            return Response({"message": "Published"})
        return Response(serializer.data)


class OwnerChapterViewSet(ModelViewSet):
    serializer_class = ChapterSerializer
    permission_classes = [IsCourseOwner]

    def get_queryset(self):
        return Chapter.objects.filter(
            course__slug=self.kwargs["course_slug"], course__owner=self.request.user
        )

    def retrieve(self, request, *args, **kwargs):
        chapter = get_object_or_404(self.get_queryset().filter(), pk=kwargs["pk"])
        serializer = ChapterDetailSerializer(chapter)
        return Response(serializer.data)

    def get_serializer_context(self):
        context = super(OwnerChapterViewSet, self).get_serializer_context()
        context.update({"course": self.kwargs["course_slug"]})
        return context


class OwnerLessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [IsCourseOwner]

    def get_queryset(self):
        return Lesson.objects.filter(
            chapter__course__slug=self.kwargs["course_slug"],
            chapter=self.kwargs["chapter_pk"],
        )

    def retrieve(self, request, *args, **kwargs):
        lesson = get_object_or_404(self.get_queryset().filter(), pk=kwargs["pk"])
        serializer = LessonsDetailSerializer(lesson)
        return Response(serializer.data)

    def list(self, request, course_slug, chapter_pk):
        get_object_or_404(
            Chapter.objects.filter(course__slug=course_slug, pk=chapter_pk)
        )
        return super().list(request)

    def create(self, request, course_slug, chapter_pk):
        get_object_or_404(
            Chapter.objects.filter(course__slug=course_slug, pk=chapter_pk)
        )
        return super().create(request)

    def get_serializer_context(self):
        context = super(OwnerLessonViewSet, self).get_serializer_context()
        context.update({"chapter": self.kwargs["chapter_pk"]})
        return context


class OwnerContentViewSet(ModelViewSet):
    serializer_class = ContentSerializer
    permission_classes = [IsCourseOwner]

    def get_queryset(self):
        return Content.objects.filter(
            lesson__chapter__course__slug=self.kwargs["course_slug"],
            lesson__chapter=self.kwargs["chapter_pk"],
            lesson=self.kwargs["lesson_pk"],
        )

    def list(self, request, course_slug, chapter_pk, lesson_pk):
        get_object_or_404(
            Lesson.objects.filter(
                chapter__course__slug=course_slug, chapter=chapter_pk, pk=lesson_pk
            )
        )
        return super().list(request)

    def create(self, request, course_slug, chapter_pk, lesson_pk):
        get_object_or_404(
            Lesson.objects.filter(
                chapter__course__slug=course_slug, chapter=chapter_pk, pk=lesson_pk
            )
        )
        return super().create(request)

    def get_serializer_context(self):
        context = super(OwnerContentViewSet, self).get_serializer_context()
        context.update({"lesson": self.kwargs["lesson_pk"]})
        return context
