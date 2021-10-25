from .views import (
    ManageCourseGroupViewSet,
    ManageCourseTopicViewSet,
    ManageCourseIconViewSet,
)

from .viewsets import (
    ManageCourseViewSet,
    ManageChapterViewSet,
    ManageLessonViewSet,
    ManageContentViewSet,
)

from django.urls import path, include

from rest_framework.routers import SimpleRouter


router = SimpleRouter()
router.register(r"group", ManageCourseGroupViewSet, basename="group")
router.register(r"topic", ManageCourseTopicViewSet, basename="topic")
router.register(r"icon", ManageCourseIconViewSet, basename="icon")
router.register(r"course", ManageCourseViewSet, basename="course")
router.register(r"chapter", ManageChapterViewSet, basename="chapter")
router.register(r"lesson", ManageLessonViewSet, basename="lesson")
router.register(r"content", ManageContentViewSet, basename="content")


urlpatterns = [
    path("", include(router.urls)),
]
