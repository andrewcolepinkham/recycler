from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, AccountAPI, CommunityAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/createaccount', AccountAPI.as_view()),
    # path('api/auth/update', UpdateAccountUserApi.as_view()), 
    path('api/communities', CommunityAPI.as_view()),
    path('api/communities/get_accounts<str:community>', CommunityAPI.get_accounts ), 

    path('api/auth/account', AccountAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]