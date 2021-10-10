from .models import Course

from django.db.models import Count


class CourseSearch:
    def __init__(self, terms=None, group=None, topics=None):
        self.terms = terms
        self.group = group
        self.topics = topics if len(topics) > 0 else None
    

    def _strict(self):
        return not (self.terms is None and self.group is None and self.topics is None)
    

    def _terms_search_only(self):
        return Course.objects.filter(name__icontains=self.terms)
    

    def _group_only(self):
        return Course.objects.filter(group=self.group)


    def _topics_only(self):
        return Course.objects.filter(topics__in=self.topics).annotate(num_topics=Count('topics')).filter(num_topics=len(self.topics))
    

    def terms_search(self):
        """
        Initialize queryset
        """
        if self.terms is None:
            return None
        return self._terms_search_only()

    
    def _group_search(self, queryset=None):
        if queryset:
            return queryset.filter(group=self.group)
        return self._group_only()


    def group_search(self, queryset=None):
        if queryset is None and self.group is None:
            return None
        elif queryset and self.group is None:
            return queryset
        else:
            return self._group_search(queryset=queryset)


    def _topics_search(self, queryset=None):
        if queryset:
            return queryset.filter(topics__in=self.topics).annotate(num_topics=Count('topics')).filter(num_topics=len(self.topics))
        return self._topics_only()


    def topics_search(self, queryset=None):
        if queryset is None and self.topics is None:
            return None
        elif queryset and self.topics is None:
            return queryset
        else:
            return self._topics_search(queryset=queryset)


    def _search(self):
        terms_result = self.terms_search()
        group_result = self.group_search(terms_result)

        if group_result is None:
            return self.topics_search(None)
        if not group_result:
            return group_result
        
        return self.topics_search(group_result)


    def result(self):
        if self._strict():
            result = self._search()
            if result is not None:
                return result
        
        # list all if no input
        return Course.objects.all()
