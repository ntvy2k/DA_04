from django.db import models
from .base import BaseQuestion, BaseOption

# Multiple Choice
# True/False
# Multiple Answers

QUESTION_TYPE = [("one", "One Answer"), ("mul", "Multiple Answers")]


class Question(BaseQuestion):
    genus = models.CharField(
        max_length=3, choices=QUESTION_TYPE, null=True, blank=True, editable=False
    )

    def __str__(self):
        return "{} | {}".format(self.statement, str(self.quiz))

    def _update_type(self, correct_answers):
        count = correct_answers.count()
        if count < 1:
            return False
        else:
            if count > 1:
                self.genus = "mul"
            else:
                self.genus = "one"
            self.save(force_update=True)
            return True

    def confirm(self):
        if self.pk:
            options = self.options.all()
            if options.count() < 2:
                return False
            else:
                correct_answers = options.filter(is_right=True)
                return self._update_type(correct_answers)
        return False


class Option(BaseOption):
    question = models.ForeignKey(
        Question, related_name="options", on_delete=models.CASCADE
    )

    def __str__(self):
        return "{} | {}".format(self.option, str(self.question))

    class Meta:
        order_with_respect_to = "question"
