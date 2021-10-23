from .models import Course

from django.db.models import Count


def is_queryset_empty(queryset):
    if queryset is None:
        return False
    return list(queryset) == []


class CourseSearch:
    def __init__(self, terms=None, group=None, topics=None):
        self.terms = terms
        self.group = group
        self.topics = topics if len(topics) > 0 else None

    def _strict(self):
        return not (self.terms is None and self.group is None and self.topics is None)

    def _terms_only(self):
        return Course.objects.filter(name__icontains=self.terms)

    def _group_only(self):
        return Course.objects.filter(group=self.group)

    def _topics_only(self):
        return (
            Course.objects.filter(topics__in=self.topics)
            .annotate(num_topics=Count("topics"))
            .filter(num_topics=len(self.topics))
        )

    def terms_query(self):
        """
        Initialize
        """
        if self.terms is None:
            return None
        return self._terms_only()

    def _queryset(self, f_search, queryset, attribute):
        if queryset is None and attribute is None:
            return None
        elif queryset and attribute is None:
            return queryset
        return f_search(queryset=queryset)

    def _group_query(self, queryset=None):
        if queryset:
            return queryset.filter(group=self.group)
        return self._group_only()

    def group_query(self, queryset=None):
        return self._queryset(self._group_query, queryset, self.group)

    def _topics_query(self, queryset=None):
        if queryset:
            return (
                queryset.filter(topics__in=self.topics)
                .annotate(num_topics=Count("topics"))
                .filter(num_topics=len(self.topics))
            )
        return self._topics_only()

    def topics_query(self, queryset=None):
        return self._queryset(self._topics_query, queryset, self.topics)

    def query(self, current_query):
        def _next(next_query=None):
            if next_query is None:
                return current_query
            return self.query(next_query(current_query))

        if is_queryset_empty(current_query):
            raise ValueError("Queryset is empty, return []")
        return _next

    def _get_result(self):
        try:
            return self.query(self.terms_query())(self.group_query)(self.topics_query)()
        except ValueError:
            return []

    def result(self):
        if self._strict():
            return self._get_result()
        return Course.objects.all()
