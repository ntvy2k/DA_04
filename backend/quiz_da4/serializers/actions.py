from django.db.models import fields
from .base import BaseExerciseSerializer, BaseQuestionSerializer


class ExercisePublisherSerializer(BaseExerciseSerializer):
    class Meta(BaseExerciseSerializer.Meta):
        fields = ["id", "name", "status"]
        read_only_fields = ["name", "status"]


class QuestionActionSerializer(BaseQuestionSerializer):
    class Meta(BaseQuestionSerializer.Meta):
        fields = ["id", "genus", "status"]
        read_only_fields = ["genus", "status"]
