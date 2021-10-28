from .models import Course

from django.db.models import Count


class CourseSearch:
    def __init__(self, terms=None, group=None, topics=None):
        self.terms = terms
        self.group = group
        self.topics = topics if len(topics) > 0 else None
        self.__queryset = Course.objects.filter(status="p")

    def __by_terms(self):
        if self.__queryset.exists() and self.terms:
            self.__queryset = self.__queryset.filter(name__icontains=self.terms)

    def __by_group(self):
        if self.__queryset.exists() and self.group:
            self.__queryset = self.__queryset.filter(group=self.group)

    def __by_topics(self):
        if self.__queryset.exists() and self.topics:
            self.__queryset = (
                self.__queryset.filter(topics__in=self.topics)
                .annotate(num_topics=Count("topics"))
                .filter(num_topics=len(self.topics))
            )

    def __query(self):
        self.__by_terms()
        self.__by_group()
        self.__by_topics()
        return self.__queryset

    def result(self):
        return self.__query()
