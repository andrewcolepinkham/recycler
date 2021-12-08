from rest_framework import generics, permissions, mixins, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, AccountSerializer, UpdateScoreSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, account= serializer.save()
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data, 
            "token": token
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user,account = serializer.validated_data
        token = AuthToken.objects.create(user)[1]
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data, 
            "token": token
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Get User API
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer
    def get_object(self):
        return self.request.user.account
    def edit_score(self, amount, type): 
        print("edit score")

# class EditScoreAPI(mixins.UpdateModelMixin):
#     permission_classes = [
#         permissions.IsAuthenticated,
#     ]
#     serializer_class = UpdateScoreSerializer
#     def update(self, request, *args, **kwargs):
#         print("here!!!!!")

#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data)
#     def perform_update(self, serializer):
#         print("here!!!!!")
        
#     def get_score(self): 
#        pass
#     def add_to_score(self, score):
#         account = self.request.user.account
#         submission_data  = self.request.__dict__["_data"]
#      #   account.score = account.score + score_calculator(submission_data['type'], int(submission_data['amount']))
#         account.save(update_fields=["score"])