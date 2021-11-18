from rest_framework.serializers import ModelSerializer
from quiz_da4.models import Exercise, Quiz, Question, Option


class BaseExerciseSerializer(ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["id", "name", "co_creator"]


class BaseQuizSerializer(ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["id", "title"]


class BaseQuestionSerializer(ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "statement"]


class BaseOptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "statement", "explain", "is_right"]
