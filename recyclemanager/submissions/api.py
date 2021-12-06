from submissions.models import Submission
from rest_framework import viewsets, permissions
from .serializers import SubmissionSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .calculate_scores import score_calculator

 

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
       
        account = self.request.user.account
        
        submission_data  = self.request.__dict__["_data"]
        account.score = account.score + score_calculator(submission_data['type'], int(submission_data['amount']))
        account.save(update_fields=["score"]) 
    #     return account
     
        serializer.save(owner=self.request.user)

        


    