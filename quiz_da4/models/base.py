from django.db import models
from django.contrib.auth.models import User


class Exercise(models.Model):
    exercise = models.CharField(max_length=50)
    creator = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    co_creator = models.ManyToManyField(User, blank=True, related_name="co_creator")

    def __str__(self):
        return self.exercise


class Quiz(models.Model):
    quiz = models.CharField(max_length=100, blank=True, null=True)
    creator = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    exercise = models.ForeignKey(
        Exercise, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return self.quiz if self.quiz else "Quiz no. {}".format(self.pk)

    class Meta:
        order_with_respect_to = "exercise"


class BaseQuestion(models.Model):
    statement = models.CharField(max_length=200)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class BaseOption(models.Model):
    option = models.CharField(max_length=50)
    explain = models.CharField(max_length=200, null=True, blank=True)
    is_right = models.BooleanField(default=False)

    class Meta:
        abstract = True
