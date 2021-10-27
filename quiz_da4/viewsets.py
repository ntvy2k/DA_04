from rest_framework.viewsets import ModelViewSet
from .models import Exercise, Quiz, Question, Option
from .serializers.generics import (
    ExerciseSerializer,
    QuizSerializer,
    QuestionSerializer,
    OptionSerializer,
)


class ExerciseViewSet(ModelViewSet):
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()


class QuizViewSet(ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class OptionViewSet(ModelViewSet):
    serializer_class = OptionSerializer
    queryset = Option.objects.all()
