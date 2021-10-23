from django.contrib import admin
from .models import Course, Chapter, Lesson, Content, CourseTopic, CourseGroup, CourseIcon


admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Lesson)
admin.site.register(Content)
admin.site.register(CourseGroup)
admin.site.register(CourseTopic)
admin.site.register(CourseIcon)
