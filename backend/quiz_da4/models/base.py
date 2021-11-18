from django.db import models
from django.contrib.auth.models import User

EXERCISE_STATUS = [("d", "Draft"), ("p", "Publish")]


class Exercise(models.Model):
    name = models.CharField(max_length=50)
    creator = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    co_creator = models.ManyToManyField(User, blank=True, related_name="co_creators")
    status = models.CharField(max_length=1, choices=EXERCISE_STATUS, default="d")

    def __str__(self):
        creator = "none"
        if self.creator:
            creator = "{} {}".format(self.creator.last_name, self.creator.first_name)
        return "{} > {} <".format(self.name, creator.strip())


class Quiz(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    creator = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    exercise = models.ForeignKey(
        Exercise,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="quizzes",
    )

    def __str__(self):
        return self.title if self.title else "Quiz no. {}".format(self.pk)

    class Meta:
        order_with_respect_to = "exercise"


class BaseQuestion(models.Model):
    statement = models.TextField(max_length=200)
    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)

    class Meta:
        abstract = True


class BaseOption(models.Model):
    statement = models.CharField(max_length=50)
    explain = models.CharField(max_length=200, null=True, blank=True)
    is_right = models.BooleanField(default=False)

    class Meta:
        abstract = True
