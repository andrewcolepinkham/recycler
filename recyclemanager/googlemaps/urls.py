from rest_framework import routers
from .api import PlacesAPI
router = routers.DefaultRouter()
router.register('api/places', PlacesAPI, 'places')

urlpatterns = router.urls