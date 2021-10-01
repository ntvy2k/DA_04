from rest_framework.generics import get_object_or_404
from .models import Course, Chapter, Lesson, Content
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer, ContentSerializer

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


class ContentViewSet(ModelViewSet):
    serializer_class = ContentSerializer

    def get_queryset(self):
        return Content.objects.filter(lesson__chapter__course=self.kwargs['course_pk'],
                                    lesson__chapter=self.kwargs['chapter_pk'],
                                    lesson=self.kwargs['lesson_pk'])


    def list(self, request, course_pk, chapter_pk, lesson_pk):
        get_object_or_404(Chapter.objects.filter(course=course_pk, pk=chapter_pk))
        get_object_or_404(Lesson.objects.filter(chapter=chapter_pk, pk=lesson_pk))
        return super().list(request)

    
    def create(self, request, course_pk, chapter_pk, lesson_pk):
        get_object_or_404(Chapter.objects.filter(course=course_pk, pk=chapter_pk))
        get_object_or_404(Lesson.objects.filter(chapter=chapter_pk, pk=lesson_pk))
        return super().create(request)
    

    def get_serializer_context(self):
        context = super(ContentViewSet, self).get_serializer_context()
        context.update({"lesson": self.kwargs['lesson_pk']})
        return context
