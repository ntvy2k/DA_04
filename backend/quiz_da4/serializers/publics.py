from rest_framework.serializers import SerializerMethodField

from .base import (
    BaseExerciseSerializer,
    BaseQuizSerializer,
    BaseQuestionSerializer,
    BaseOptionSerializer,
)

from quiz_da4.models.choices import Question


class OptionExplainSerializer(BaseOptionSerializer):
    class Meta(BaseOptionSerializer.Meta):
        fields = ["id", "explain", "is_right"]


class OptionPublicSerializer(BaseOptionSerializer):
    class Meta(BaseOptionSerializer.Meta):
        fields = ["id", "statement"]


class QuestionPublicSerializer(BaseQuestionSerializer):
    options = OptionPublicSerializer(many=True, read_only=True)

    class Meta(BaseQuestionSerializer.Meta):
        fields = BaseQuestionSerializer.Meta.fields + ["genus", "options"]


class QuizPublicSerializer(BaseQuizSerializer):
    questions = SerializerMethodField("get_questions")

    def get_questions(self, quiz):
        qs = Question.objects.filter(quiz=quiz, status="r")
        serializer = QuestionPublicSerializer(instance=qs, many=True, read_only=True)
        return serializer.data

    class Meta(BaseQuizSerializer.Meta):
        fields = ["id", "title", "questions"]


class ExercisePublicSerializer(BaseExerciseSerializer):
    quizzes = QuizPublicSerializer(many=True, read_only=True)

    class Meta(BaseExerciseSerializer.Meta):
        fields = ["id", "name", "quizzes"]


class ShortExerciseList(BaseExerciseSerializer):
    class Meta(BaseExerciseSerializer.Meta):
        fields = ["id", "name"]
