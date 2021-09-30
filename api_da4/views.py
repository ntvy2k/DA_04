from rest_framework.generics import get_object_or_404
from .models import Course, Chapter, Lesson
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response


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
        return Lesson.objects.filter(chapter__course=self.kwargs['course_pk'], chapter=self.kwargs['chapter_pk'])
    

    def list(self, request, course_pk, chapter_pk):
        get_object_or_404(Chapter.objects.filter(course=course_pk, pk=chapter_pk))
        return super().list(request)
    

    def create(self, request, course_pk, chapter_pk):
        get_object_or_404(Chapter.objects.filter(course=course_pk, pk=chapter_pk))
        return super().create(request)

    
    def get_serializer_context(self):
        context = super(LessonViewSet, self).get_serializer_context()
        context.update({"chapter": self.kwargs['chapter_pk']})
        return context
