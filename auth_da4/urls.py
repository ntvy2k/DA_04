from django.urls import path, include
from .views import (UserRegisterView,
                    UserLoginView,
                    UserLogoutView,
                    OwnerProfileView,
                    UserChangePasswordView)

from .viewsets import UserViewSet

from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'member', UserViewSet, basename="member")


urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegisterView.as_view(), name="register"),
    path('token/', UserLoginView.as_view(), name="get-token"),
    path('token-destroy/', UserLogoutView.as_view(), name="destroy-token"),
    path('profile/', OwnerProfileView.as_view(), name="profile"),
    path('profile/change-password/', UserChangePasswordView.as_view(), name="change-password"),
]