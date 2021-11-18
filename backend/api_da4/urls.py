from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from rest_framework_nested.routers import NestedDefaultRouter
from .viewsets import (
    OwnerCourseViewSet,
    OwnerChapterViewSet,
    OwnerLessonViewSet,
    OwnerContentViewSet,
    CourseGroupViewSet,
    CourseTopicViewSet,
    CourseIconViewSet,
    CourseViewSet,
    ChapterViewSet,
    LessonViewSet,
    ContentViewSet,
)

from .views import CourseSearchView

router = DefaultRouter()
router.register(r"group", CourseGroupViewSet, basename="group")
router.register(r"topic", CourseTopicViewSet, basename="topic")
router.register(r"icon", CourseIconViewSet, basename="icon")

# Read-Only Resources
router.register(r"course", CourseViewSet, basename="course")
chapter_router = NestedDefaultRouter(router, r"course", lookup="course")
chapter_router.register(r"chapter", ChapterViewSet, basename="chapter")
lesson_router = NestedDefaultRouter(chapter_router, r"chapter", lookup="chapter")
lesson_router.register(r"lesson", LessonViewSet, basename="lesson")
content_router = NestedDefaultRouter(lesson_router, r"lesson", lookup="lesson")
content_router.register(r"content", ContentViewSet, basename="content")

# Owner Resources
owner_router = DefaultRouter()
owner_router.register(r"course", OwnerCourseViewSet, basename="course")
owner_chapter_router = NestedDefaultRouter(owner_router, r"course", lookup="course")
owner_chapter_router.register(r"chapter", OwnerChapterViewSet, basename="chapter")
owner_lesson_router = NestedDefaultRouter(
    owner_chapter_router, r"chapter", lookup="chapter"
)
owner_lesson_router.register(r"lesson", OwnerLessonViewSet, basename="lesson")
owner_content_router = NestedDefaultRouter(
    owner_lesson_router, r"lesson", lookup="lesson"
)
owner_content_router.register(r"content", OwnerContentViewSet, basename="content")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(chapter_router.urls)),
    path("", include(lesson_router.urls)),
    path("", include(content_router.urls)),
    path("owner/", include(owner_router.urls)),
    path("owner/", include(owner_chapter_router.urls)),
    path("owner/", include(owner_lesson_router.urls)),
    path("owner/", include(owner_content_router.urls)),
    path("search/", CourseSearchView.as_view(), name="search"),
    path("api-auth/", include("rest_framework.urls")),
]
