from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Exercise, Quiz, Question, Option
from .serializers.generics import (
    ExerciseSerializer,
    QuizSerializer,
    QuestionSerializer,
    OptionSerializer,
)

from .serializers.publics import ExercisePublicSerializer, OptionExplainSerializer
from .serializers.actions import ExercisePublisherSerializer, QuestionActionSerializer

from .permissions import IsCreatorOrReadOnly, IsQuizCreator

from api_da4.viewsets import ReadOnlyBaseViewSet
from auth_da4.serializers import UserSerializer


# Exercise Creator View
class CreatorMixin:
    permission_classes = [IsAuthenticated, IsCreatorOrReadOnly]

    def get_queryset(self):
        return self.queryset.filter(creator=self.request.user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class ExerciseCreatorViewSet(CreatorMixin, ModelViewSet):
    serializer_class = ExerciseSerializer
    serializer_action_class = ExercisePublisherSerializer
    queryset = Exercise.objects.all()

    def get_serializer_class(self):
        if self.action == "make_published":
            return self.serializer_action_class
        return super(ExerciseCreatorViewSet, self).get_serializer_class()

    @action(
        detail=True,
        methods=["get", "put"],
        url_path="make-publish",
    )
    def make_published(self, request, pk):
        instance = self.get_object()
        if request.method == "PUT":
            instance.status = "p"
            instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["get"],
        url_path="get-another-exercise",
    )
    def get_exercise(self, request):
        queryset = Exercise.objects.filter(co_creator=request.user)
        serializer = ExerciseSerializer(queryset, many=True, read_only=True)
        return Response(serializer.data)

    @action(
        detail=False,
        methods=["get"],
        url_path="get-users",
    )
    def get_user(self, request):
        queryset = User.objects.exclude(pk=self.request.user.pk)
        serializer = UserSerializer(queryset, many=True, read_only=True)
        return Response(serializer.data)

    def get_serializer_context(self):
        context = super(ExerciseCreatorViewSet, self).get_serializer_context()
        context.update({"user": self.request.user})
        return context


class QuizCreatorViewSet(CreatorMixin, ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()

    def get_serializer_context(self):
        context = super(QuizCreatorViewSet, self).get_serializer_context()
        context.update({"user": self.request.user})
        return context


class QuestionCreatorViewSet(ModelViewSet):
    serializer_class = QuestionSerializer
    permission_classes = [IsQuizCreator]
    serializer_action_class = QuestionActionSerializer

    def get_serializer_class(self):
        if self.action in ["make_confirm", "make_ready"]:
            return self.serializer_action_class
        return super(QuestionCreatorViewSet, self).get_serializer_class()

    def perform_create(self, serializer):
        quiz = Quiz.objects.get(pk=self.kwargs["quiz_pk"])
        serializer.save(quiz=quiz)

    def get_queryset(self):
        return Question.objects.filter(
            quiz=self.kwargs["quiz_pk"], quiz__creator=self.request.user
        )

    @action(
        detail=True,
        methods=["get", "put"],
        url_path="make-confirm",
    )
    def make_confirm(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.method == "PUT":
            if instance.confirm_genus_success():
                return Response({"message": "Đã xác nhận."})
            else:
                return Response(
                    {
                        "message": "Chưa thể xác nhận, 1 question phải có ít nhất 2 option và phải ít nhất 1 option đúng."
                    }
                )
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(
        detail=True,
        methods=["get", "put"],
        url_path="make-ready",
    )
    def make_ready(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.method == "PUT":
            if instance.make_ready_success():
                return Response({"message": "OK, giờ trong quiz sẽ có question này."})
            else:
                return Response({"message": "Xin hãy xác nhận lại question."})
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class OptionCreatorViewSet(ModelViewSet):
    serializer_class = OptionSerializer
    permission_classes = [IsQuizCreator]

    def perform_create(self, serializer):
        question = Question.objects.get(pk=self.kwargs["question_pk"])
        serializer.save(question=question)

    def get_queryset(self):
        return Option.objects.filter(
            question=self.kwargs["question_pk"], question__quiz=self.kwargs["quiz_pk"]
        )


# Guest


class ExerciseViewSet(ReadOnlyBaseViewSet):
    serializer_class = ExercisePublicSerializer
    queryset = Exercise.objects.filter(status="p")
    permission_classes = []

    @action(
        detail=True,
        methods=["get"],
        url_path="get-answer",
    )
    def get_answer(self, request, *args, **kwargs):
        question = request.query_params.get("question")
        options = request.query_params.getlist("options")
        if question and options:
            try:
                question = Question.objects.get(pk=question)
            except Question.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            if question.quiz.exercise.pk != int(kwargs["pk"]):
                return Response(status=status.HTTP_400_BAD_REQUEST)

            if not question.is_ready():
                return Response(status=status.HTTP_400_BAD_REQUEST)

            is_answer_right = question.is_answer_right(options)
            serializer = OptionExplainSerializer(
                question.options.all(), many=True, read_only=True
            )
            return Response(
                {"is_answer_right": is_answer_right, "answers": serializer.data}
            )
        return Response(status=status.HTTP_400_BAD_REQUEST)
