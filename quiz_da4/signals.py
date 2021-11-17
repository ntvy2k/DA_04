from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Question, Option


@receiver(post_save, sender=Option)
def set_question_not_ready(sender, instance, **kwargs):
    if instance.question.is_complete() | instance.question.is_ready():
        instance.question.set_incomplete()
