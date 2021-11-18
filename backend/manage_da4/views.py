from rest_framework.permissions import IsAuthenticated, IsAdminUser
from api_da4.viewsets import CourseTopicViewSet, CourseGroupViewSet, CourseIconViewSet


class ManageCourseTopicViewSet(CourseTopicViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]


class ManageCourseGroupViewSet(CourseGroupViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]


class ManageCourseIconViewSet(CourseIconViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
