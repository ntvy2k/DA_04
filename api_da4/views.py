from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


# TODO: search feature
class CourseSearchView(APIView):
    def get(self, request):
        print(request)
        print(request.query_params)
        print(request.query_params.get("term"))
        return Response(status=status.HTTP_200_OK)
