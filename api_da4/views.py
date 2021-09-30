from .models import Course, Chapter, Lesson
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer

from rest_framework.viewsets import ModelViewSet


class CourseViewSet(ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class ChapterViewSet(ModelViewSet):
    serializer_class = ChapterSerializer

    def get_queryset(self):
        return Chapter.objects.filter(course=self.kwargs['course_pk'])

    def get_serializer_context(self):
        context = super(ChapterViewSet, self).get_serializer_context()
        context.update({"course": self.kwargs['course_pk']})
        return context


class LessonViewSet(ModelViewSet):
    serializer_class = LessonSerializer

    def get_queryset(self):
        course = Chapter.objects.filter(course=self.kwargs['course_pk'])
        return Lesson.objects.filter(chapter__in=course, chapter=self.kwargs['chapter_pk'])
    
    def get_serializer_context(self):
        context = super(LessonViewSet, self).get_serializer_context()
        context.update({"chapter": self.kwargs['chapter_pk']})
        return context
