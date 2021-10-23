from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly, CourseOwnerOrReadOnly, IsAdminUserOrReadOnly

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


class CourseIconViewSet(ModelViewSet):
    serializer_class = CourseIconSerializer
    queryset = CourseIcon.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]


class CourseGroupViewSet(ModelViewSet):
    serializer_class = CourseGroupSerializer
    queryset = CourseGroup.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]


class CourseTopicViewSet(ModelViewSet):
    serializer_class = CourseTopicSerializer
    queryset = CourseTopic.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]


class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    lookup_field = "slug"
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def retrieve(self, request, slug):
        course = get_object_or_404(self.queryset.filter(), slug=slug)
        serializer = CourseDetailSerializer(course)
        return Response(serializer.data)


class ChapterViewSet(ModelViewSet):
    serializer_class = ChapterSerializer
    permission_classes = [CourseOwnerOrReadOnly]

    def get_queryset(self):
        return Chapter.objects.filter(course__slug=self.kwargs["course_slug"])

    def retrieve(self, request, *args, **kwargs):
        chapter = get_object_or_404(self.get_queryset().filter(), pk=kwargs["pk"])
        serializer = ChapterDetailSerializer(chapter)
        return Response(serializer.data)

    def get_serializer_context(self):
        context = super(ChapterViewSet, self).get_serializer_context()
        context.update({"course": self.kwargs["course_slug"]})
        return context


class LessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer
    permission_classes = [CourseOwnerOrReadOnly]

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
        context = super(LessonViewSet, self).get_serializer_context()
        context.update({"chapter": self.kwargs["chapter_pk"]})
        return context


class ContentViewSet(ModelViewSet):
    serializer_class = ContentSerializer
    permission_classes = [CourseOwnerOrReadOnly]

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
        context = super(ContentViewSet, self).get_serializer_context()
        context.update({"lesson": self.kwargs["lesson_pk"]})
        return context
