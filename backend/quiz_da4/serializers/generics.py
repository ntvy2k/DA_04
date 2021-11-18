from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.relations import PrimaryKeyRelatedField
from quiz_da4.models import Exercise
from .base import (
    BaseExerciseSerializer,
    BaseQuizSerializer,
    BaseQuestionSerializer,
    BaseOptionSerializer,
)


class UserFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context["user"]
        queryset = User.objects.exclude(pk=user.pk)
        return queryset


class ExerciseSerializer(BaseExerciseSerializer):
    co_creator = UserFilteredPrimaryKeyRelatedField(many=True)


class ExerciseFilteredPrimaryKeyRelatedField(PrimaryKeyRelatedField):
    def get_queryset(self):
        user = self.context["user"]
        queryset = Exercise.objects.filter(Q(co_creator=user) | Q(creator=user))
        return queryset


class QuizSerializer(BaseQuizSerializer):
    exercise = ExerciseFilteredPrimaryKeyRelatedField(allow_null=True)

    class Meta(BaseQuizSerializer.Meta):
        fields = BaseQuizSerializer.Meta.fields + ["exercise"]


class QuestionSerializer(BaseQuestionSerializer):
    pass


class OptionSerializer(BaseOptionSerializer):
    pass
