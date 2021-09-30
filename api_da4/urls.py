from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .views import CourseViewSet, ChapterViewSet, LessonViewSet


course_router = DefaultRouter();
course_router.register(r'course', CourseViewSet, basename='course')

chapter_router = NestedDefaultRouter(course_router, r'course', lookup='course')
chapter_router.register(r'chapter', ChapterViewSet, basename='chapter')

lesson_router = NestedDefaultRouter(chapter_router, r'chapter', lookup='chapter')
lesson_router.register(r'lesson', LessonViewSet, basename='lesson')

urlpatterns = [
    path('', include(course_router.urls)),
    path('', include(chapter_router.urls)),
    path('', include(lesson_router.urls)),
]

