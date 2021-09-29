from django.urls import path
from .views import  (UserRegisterView, 
                    UserLoginView, 
                    UserLogoutView,
                    UserProfileView)


urlpatterns = [
    path('register/', UserRegisterView.as_view(), name="register"),
    path('token/', UserLoginView.as_view(), name="get-token"),
    path('token-destroy/', UserLogoutView.as_view(), name="destroy-token"),
    path('profile', UserProfileView.as_view(), name="profile"),
]