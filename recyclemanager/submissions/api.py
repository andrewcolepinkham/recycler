from submissions.models import Submission
from rest_framework import viewsets, permissions
from .serializers import SubmissionSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = SubmissionSerializer