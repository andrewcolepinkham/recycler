from rest_framework import routers
from .api import PlacesAPI
from .views import places_list
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
# router = routers.DefaultRouter()
# router.register('api/places', places_list, 'places')

# urlpatterns = router.urls

urlpatterns = [
    path('api/places/', places_list)
]

urlpatterns = format_suffix_patterns(urlpatterns)