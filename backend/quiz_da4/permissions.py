from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.generics import get_object_or_404
from .models import Quiz


class IsCreatorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.creator == request.user


class IsQuizCreator(BasePermission):
    def has_permission(self, request, view):
        quiz = get_object_or_404(Quiz.objects.filter(), pk=view.kwargs["quiz_pk"])
        user = request.user
        return user.is_authenticated and user == quiz.creator
