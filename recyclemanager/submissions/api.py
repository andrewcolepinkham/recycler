from submissions.models import Submission
from rest_framework import viewsets, permissions
from .serializers import SubmissionSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .calculate_scores import score_calculator

from rest_framework.response import Response


class SubmissionViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    # queryset = Submission.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = SubmissionSerializer
    def get_queryset(self):

        return self.request.user.submissions.all()
    # def create(self, request): 
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    def perform_destroy(self, instance): 
        account = self.request.user.account
        account.delete_score_and_submission(instance.get_score())
        account.save(update_fields=["score"]) 
        account.save(update_fields=["num_submissions"]) 
        instance.delete()
    def perform_create(self, serializer):

        ###################
        # MAY NEED TO MOVE THIS
        # logic to update score in the account 
        account = self.request.user.account
        submission_data  = self.request.__dict__["_data"]
        account.update_score( score_calculator(submission_data['type'], float(submission_data['amount'])))
        account.save(update_fields=["score"]) 
        account.add_num_submission()
        account.save(update_fields=["num_submissions"]) 
    #     return account
       
        serializer.save(owner=self.request.user)
        

        
#https://docs.djangoproject.com/en/4.0/ref/models/relations/

    