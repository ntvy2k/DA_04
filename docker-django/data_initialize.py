from django.contrib.auth.models import User
import logging

logging.basicConfig(level=logging.NOTSET)
log = logging.getLogger("Initialize")

def init_admin():
    if not User.objects.filter(username='admin'):
        User.objects.create_superuser(username='admin', password='admin', email='admin@site.net')
        log.info("Superuser: created")


# TODO some icons
def init_course_icons():
    pass


# TODO some groups
def init_course_groups():
    pass


# TODO some topics
def init_course_topics():
    pass


def initialize():
    init_admin()


initialize()
