from submissions.models import Submission
from rest_framework import viewsets, permissions
from .serializers import SubmissionSerializer
from rest_framework.parsers import MultiPartParser, FormParser
#accounts.models import Account;
 

class SubmissionViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    # queryset = Submission.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SubmissionSerializer
    def get_queryset(self):
        return self.request.user.submissions.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        #Account.objects.get(id=self.request.user.id)
        #print(Account.username)


    