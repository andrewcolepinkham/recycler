from rest_framework import routers
from .api import SubmissionViewSet
router = routers.DefaultRouter()
router.register('api/submissions', SubmissionViewSet, 'submissions')

urlpatterns = router.urls