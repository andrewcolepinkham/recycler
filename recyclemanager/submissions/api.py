from submissions.models import Submission
from rest_framework import viewsets, permissions
from .serializers import SubmissionSerializer
from rest_framework.parsers import MultiPartParser, FormParser

 

class SubmissionViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    # queryset = Submission.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SubmissionSerializer
    print("SubmissionViewSet")
    def get_queryset(self):

        return self.request.user.submissions.all()

    def perform_create(self, serializer):
     
        account = self.request.user.account
        account.update_score(1)
        account.save(update_fields=["score"]) 

        serializer.save(owner=self.request.user)

        


    