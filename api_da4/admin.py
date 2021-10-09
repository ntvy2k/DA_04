from django.contrib import admin
from .models import Course, Chapter, Lesson, Content


# Xong viec chac la xoa luon
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Lesson)
admin.site.register(Content)
