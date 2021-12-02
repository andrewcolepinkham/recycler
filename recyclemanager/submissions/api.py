from submissions.models import Submission
from rest_framework import viewsets, permissions
from .serializers import SubmissionSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    # queryset = Submission.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        return self.request.user.submissions.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    