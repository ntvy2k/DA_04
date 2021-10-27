from uuid import uuid4

from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


COURSE_DEFAULT_NAME = "Khóa học mới"
CHAPTER_DEFAULT_NAME = "Chương mới"
LESSON_DEFAULT_NAME = "Bài học mới"
CONTENT_DEFAULT_TITLE = "Nội dung mới"


STATUS_CHOICES = [
    ("d", "Draft"),
    ("p", "Published"),
]


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
    name = models.CharField(max_length=50, default=COURSE_DEFAULT_NAME)
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
    topics = models.ManyToManyField(CourseTopic, related_name="tp_courses", blank=True)
    icon = models.ForeignKey(
        CourseIcon, null=True, blank=True, on_delete=models.SET_NULL
    )
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default="d")

    def __str__(self):
        return self.name

    def _generate_slug(self):
        self.slug = slugify(self.name)
        if Course.objects.filter(slug=self.slug).exists():
            self.slug = self.slug + "-" + str(self.pk)

    def init_slug(self):
        if not self.slug:
            if self.name == COURSE_DEFAULT_NAME:
                self.slug = str(self.pk)
            else:
                self._generate_slug()
        else:
            if self.slug.isnumeric() and COURSE_DEFAULT_NAME not in self.name:
                self._generate_slug()

    def init_author(self):
        if not self.author:
            self.author = (
                self.owner.last_name.strip() + " " + self.owner.first_name.strip()
            ).strip()

    def _update(self):
        self.init_author()
        self.init_slug()
        super(Course, self).save(force_update=True)

    def save(self, *args, **kwargs):
        if self.pk:
            self._update()
        else:
            super(Course, self).save(*args, **kwargs)
            self.save(*args, **kwargs)


class Chapter(models.Model):
    name = models.CharField(max_length=50, default=CHAPTER_DEFAULT_NAME)
    course = models.ForeignKey(
        Course, related_name="chapters", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        order_with_respect_to = "course"

    def __str__(self):
        return self.name + " | " + self.course.name


class Lesson(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=50, default=LESSON_DEFAULT_NAME)
    chapter = models.ForeignKey(
        Chapter, related_name="lessons", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    class Meta:
        order_with_respect_to = "chapter"

    def __str__(self):
        return self.name + " | " + str(self.chapter)


class Content(models.Model):
    title = models.CharField(max_length=50, default=CONTENT_DEFAULT_TITLE)
    content = models.JSONField(null=True, blank=True)
    lesson = models.ForeignKey(
        Lesson, related_name="contents", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title + " | " + str(self.lesson)

    class Meta:
        order_with_respect_to = "lesson"
