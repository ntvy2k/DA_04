from django.db import models


class Course(models.Model):
    name = models.CharField(max_length=50, unique=True)
    author = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Chapter(models.Model):
    name = models.CharField(max_length=50)
    course = models.ForeignKey(Course, related_name="chapters", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        order_with_respect_to = 'course'


    def __str__(self):
        return self.name


class Lesson(models.Model):
    name = models.CharField(max_length=50)
    chapter = models.ForeignKey(Chapter, related_name="lessons",on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        order_with_respect_to = 'chapter'

    def __str__(self):
        return self.name


class Content(models.Model):
    title = models.CharField(max_length=24)
    content = models.JSONField(null=True)
    lesson = models.ForeignKey(Lesson, related_name="contents", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    class Meta:
        order_with_respect_to = 'lesson'
