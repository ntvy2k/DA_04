from uuid import uuid4

from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class AbstractType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        abstract = True


class CourseGroup(AbstractType):
    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class CourseTopic(AbstractType):
    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]


class CourseIcon(AbstractType):
    nontation = models.CharField(max_length=40, primary_key=True, editable=True)

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=50, unique=True)
    author = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=50, unique=True)
    owner = models.ForeignKey(User, related_name="courses", on_delete=models.CASCADE)
    group = models.ForeignKey(
        CourseGroup,
        related_name="gr_courses",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    topics = models.ManyToManyField(CourseTopic, related_name="tp_courses")
    icon = models.ForeignKey(
        CourseIcon, null=True, blank=True, on_delete=models.SET_NULL
    )

    def __str__(self):
        return self.name

    def init_or_ignore_slug(self):
        if not self.slug:
            self.slug = slugify(self.name)
            if Course.objects.filter(slug=self.slug).exists():
                self.slug = self.slug + "-" + str(self.id)

    def init_or_ignore_author(self):
        if not self.author:
            self.author = (
                self.owner.last_name.strip() + " " + self.owner.first_name.strip()
            )

    def save(self, *args, **kwargs):
        self.init_or_ignore_slug()
        self.init_or_ignore_author()
        super(Course, self).save(*args, **kwargs)


class Chapter(models.Model):
    name = models.CharField(max_length=50)
    course = models.ForeignKey(
        Course, related_name="chapters", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        order_with_respect_to = "course"

    def __str__(self):
        return self.name


class Lesson(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=50)
    chapter = models.ForeignKey(
        Chapter, related_name="lessons", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        order_with_respect_to = "chapter"

    def __str__(self):
        return self.name


class Content(models.Model):
    title = models.CharField(max_length=24)
    content = models.JSONField(null=True)
    lesson = models.ForeignKey(
        Lesson, related_name="contents", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title

    class Meta:
        order_with_respect_to = "lesson"
