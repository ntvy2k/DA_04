from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=50, unique=True)
    author = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Chapter(models.Model):
    name = models.CharField(max_length=50)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name


class Lesson(models.Model):
    name = models.CharField(max_length=50)
    chapter = models.ForeignKey("Chapter", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name


class Content(models.Model):
    title = models.CharField(max_length=24)
    content = models.JSONField(null=True)
    lesson = models.ForeignKey("Lesson", on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['id']
