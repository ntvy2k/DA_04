from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.generics import get_object_or_404

from .models import Course


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsCourseOwner(BasePermission):
    def has_permission(self, request, view):
        course = get_object_or_404(
            Course.objects.filter(), slug=view.kwargs["course_slug"]
        )
        user = request.user
        return user.is_authenticated and user == course.owner


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.owner == request.user
