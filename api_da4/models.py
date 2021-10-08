from uuid import uuid4

from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Course(models.Model):
    name = models.CharField(max_length=50, unique=True)
    author = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=50, unique=True)


    def __str__(self):
        return self.name
    

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            if Course.objects.filter(slug=self.slug).exists():
                self.slug = self.slug + '-' + str(self.id)
        super(Course, self).save(*args, **kwargs)



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
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
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
