from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .viewsets import ExerciseViewSet, QuizViewSet, QuestionViewSet, OptionViewSet

router = DefaultRouter()
router.register(r"e", ExerciseViewSet, basename="exercise")
router.register(r"quiz", QuizViewSet, basename="quiz")
router.register(r"question", QuestionViewSet, basename="question")
router.register(r"option", OptionViewSet, basename="option")


urlpatterns = [
    path("", include(router.urls)),
]
