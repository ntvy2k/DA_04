from django.db import models
from .base import BaseQuestion, BaseOption

# Multiple Choice
# True/False
# Multiple Answers

QUESTION_TYPE = [
    ("one", "One Answer"),
    ("mul", "Multiple Answers"),
    ("non", "incomplete question"),
]
QUESTION_STATUS = [("r", "ready"), ("n", "not ready")]


class Question(BaseQuestion):
    genus = models.CharField(
        max_length=3, choices=QUESTION_TYPE, default="non", editable=False
    )
    status = models.CharField(
        max_length=1, choices=QUESTION_STATUS, default="n", editable=False
    )

    def __str__(self):
        return "{} | {}".format(self.statement, str(self.quiz))

    def is_valid_question(self):
        if self.pk and self.options.all().count() > 1:
            return True
        else:
            return False

    def get_number_of_correct_answers(self):
        if self.is_valid_question():
            return self.options.filter(is_right=True).count()

    def get_correct_type(self):
        number_of_correct_answers = self.get_number_of_correct_answers()
        if number_of_correct_answers and number_of_correct_answers > 0:
            if number_of_correct_answers > 1:
                return "mul"
            else:
                return "one"
        else:
            return "non"

    def is_complete(self):
        if self.genus == "non":
            return False
        else:
            return True

    def _update_genus(self):
        self.genus = self.get_correct_type()
        self.save(force_update=True)

    def confirm_genus_success(self):
        self._update_genus()
        return self.is_complete()

    def _update_status(self):
        if self.is_complete():
            self.status = "r"
        else:
            self.status = "n"
        self.save(force_update=True)

    def is_ready(self):
        return self.status == "r"

    def make_ready_success(self):
        self._update_status()
        return self.is_ready()

    def set_incomplete(self):
        self.status = "n"
        self.genus = "non"
        self.save()

    def __get_correct_answers(self, options):
        return {pk: is_right for pk, is_right in options.items() if is_right}

    def __get_incorrect_answers(self, options):
        return {pk: is_right for pk, is_right in options.items() if not is_right}

    def __get_answers(self):
        """
        answers -> correct_answers, incorrect_answers
        """
        if self.pk:
            options = {option.pk: option.is_right for option in self.options.all()}
            return self.__get_correct_answers(options), self.__get_incorrect_answers(
                options
            )

    def is_answer_right(self, answers: list[int]):
        if self.pk:
            correct_answers, incorrect_answers = self.__get_answers()
            for answer in answers:
                try:
                    answer = int(answer)
                except ValueError:
                    raise ValueError("options phải là con số")
                if answer in correct_answers:
                    correct_answers.pop(answer)
                elif answer in incorrect_answers:
                    return False
                else:
                    return False
            return not bool(correct_answers)


class Option(BaseOption):
    question = models.ForeignKey(
        Question, related_name="options", on_delete=models.CASCADE
    )

    def __str__(self):
        return "{} | {}".format(self.statement, str(self.question))

    class Meta:
        order_with_respect_to = "question"
