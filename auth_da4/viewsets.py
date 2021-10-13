from django.contrib.auth.models import User

from .serializers import BaseUserSerializer

from rest_framework.viewsets import ReadOnlyModelViewSet


class UserViewSet(ReadOnlyModelViewSet):
    serializer_class = BaseUserSerializer
    queryset = User.objects.all()

