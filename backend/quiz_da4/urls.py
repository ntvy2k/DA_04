from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter

from .viewsets import (
    ExerciseViewSet,
    ExerciseCreatorViewSet,
    QuizCreatorViewSet,
    QuestionCreatorViewSet,
    OptionCreatorViewSet,
)

router = DefaultRouter()
router.register(r"exercise", ExerciseViewSet, basename="exercise_view")

creator_router = DefaultRouter()
creator_router.register(r"exercise", ExerciseCreatorViewSet, basename="exercise")
creator_router.register(r"quiz", QuizCreatorViewSet, basename="quiz")

quiz_creator_router = NestedDefaultRouter(creator_router, r"quiz", lookup="quiz")
quiz_creator_router.register(r"question", QuestionCreatorViewSet, basename="question")
question_creator_router = NestedDefaultRouter(
    quiz_creator_router, r"question", lookup="question"
)
question_creator_router.register(r"option", OptionCreatorViewSet, basename="option")


urlpatterns = [
    path("p/", include(router.urls)),
    path("creator/", include(creator_router.urls)),
    path("creator/", include(quiz_creator_router.urls)),
    path("creator/", include(question_creator_router.urls)),
]
