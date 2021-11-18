from django.contrib import admin
from .models import Exercise, Quiz, Question, Option

# Register your models here.
admin.site.register(Exercise)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Option)
