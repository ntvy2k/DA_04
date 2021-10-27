from rest_framework.serializers import ModelSerializer
from quiz_da4.models import Exercise, Quiz, Question, Option


class ExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = "__all__"


class QuizSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = "__all__"


class QuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"
