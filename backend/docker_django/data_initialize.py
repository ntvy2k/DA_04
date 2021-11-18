import logging

from django.contrib.auth.models import User
from api_da4.models import CourseGroup, CourseTopic, CourseIcon
from docker_django.data.course_topics import TOPICS
from docker_django.data.course_icons import ICONS
from docker_django.data.course_groups import GROUPS


logging.basicConfig(level=logging.NOTSET)
log = logging.getLogger("Initialize")


def init_admin():
    if not User.objects.filter(username="admin"):
        User.objects.create_superuser(
            username="admin", password="admin", first_name="TD4", email="admin@site.net"
        )
        log.info("Superuser: Created")


def init_course_icons():
    if not CourseIcon.objects.all():
        for icon in ICONS:
            CourseIcon.objects.create(name=icon["name"], nontation=icon["nontation"])
        log.info("Course's Icons: Created")


def init_course_groups():
    if not CourseGroup.objects.all():
        for group in GROUPS:
            CourseGroup.objects.create(name=group)
        log.info("Course's Groups: Created")


def init_course_topics():
    if not CourseTopic.objects.all():
        for topic in TOPICS:
            CourseTopic.objects.create(name=topic)
        log.info("Course's Topics: Created")


def initialize():
    init_admin()
    init_course_icons()
    init_course_groups()
    init_course_topics()


log.info("Starting...")
initialize()
log.info("Done...")
