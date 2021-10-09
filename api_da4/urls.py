from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .viewsets import (CourseViewSet, ChapterViewSet, 
                    LessonViewSet, ContentViewSet, 
                    CourseGroupViewSet, CourseTopicViewSet)

from .views import CourseSearchView


router = DefaultRouter();
router.register(r'course', CourseViewSet, basename='course')
router.register(r'group', CourseGroupViewSet, basename='group')
router.register(r'topic', CourseTopicViewSet, basename='topic')

chapter_router = NestedDefaultRouter(router, r'course', lookup='course')
chapter_router.register(r'chapter', ChapterViewSet, basename='chapter')

lesson_router = NestedDefaultRouter(chapter_router, r'chapter', lookup='chapter')
lesson_router.register(r'lesson', LessonViewSet, basename='lesson')

content_router = NestedDefaultRouter(lesson_router, r'lesson', lookup='lesson')
content_router.register(r'content', ContentViewSet, basename='content')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(chapter_router.urls)),
    path('', include(lesson_router.urls)),
    path('', include(content_router.urls)),
    path('search/', CourseSearchView.as_view(), name="search"),
    path('api-auth/', include('rest_framework.urls')),  # xong viec, xoa
]

