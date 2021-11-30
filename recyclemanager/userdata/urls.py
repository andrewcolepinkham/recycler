from rest_framework import routers
from .api import UserViewSet

router = routers.DefaultRouter()
router.register('api/userdata', UserViewSet, 'userdata')

urlpatterns = router.urls