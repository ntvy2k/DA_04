from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers.generics import CourseSerializer

from .utils import CourseSearch


class CourseSearchView(APIView):
    def get(self, request):
        terms = request.query_params.get("terms")
        group = request.query_params.get("group")
        topics = request.query_params.getlist("topics")

        result = CourseSearch(terms, group, topics).result()
        serializer = CourseSerializer(result, many=True)
        
        return Response(serializer.data)
