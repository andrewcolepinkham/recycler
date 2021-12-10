from rest_framework import generics, permissions, mixins, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Account, Community, Membership
from .serializers import UserSerializer, RegisterSerializer, CommunitySerializer, LoginSerializer, AccountSerializer, UpdateScoreSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # Community.objects.all().delete()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user= serializer.save()
        token = AuthToken.objects.create(user)[1]
        communities_names = ["Colorado College"] #[request.data["communities"]]
        count = 0
        print(request.__dict__)
        #image = request.FILES['myImage']
       # print(image)
        community = Community.objects.get_or_create(name="Default")[0]
        print(community)
        account = Account.objects.create(user=user,username=request.data['username'], profile_photo=None)
        m1 = Membership.objects.create(account=account, community=community)

        m1.save()

        #WILL NEED TO CHANGE IF ITS  ALIST
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data, 
            "account": AccountSerializer(account, 
            context=self.get_serializer_context()).data, 
            "token": token
        })
class CreateAccountAPI(generics.GenericAPIView):
    serializer_class = AccountSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, account= serializer.save()
        token = AuthToken.objects.create(user)[1]
        
        return Response({
            "account": AccountSerializer(account, 
            context=self.get_serializer_context()).data, 
            "token": token
        })

class CommunityAPI(generics.GenericAPIView): 
    serializer_class = CommunitySerializer
    def post(self, request, *args, **kwargs):
        validated_data = request.data
        community = Community.objects.create(name=validated_data["name"], zipcode=validated_data["zip"])

        return Response({
            "community" : CommunitySerializer(community,  context=self.get_serializer_context()).data

        })
    def put(self, request, pk): 
        # PUT a new user into community 
        pass
    def get(self, request): 
        return Community.objects.all()
    def change_admin(self):
        #change who the admin is 
        pass

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
       
        
            

       # community = Community.objects.create(name="Default", zip_code=80903)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user,account = serializer.validated_data
        token = AuthToken.objects.create(user)[1]
        account.check_score()
        account.communities  = "Default"
        account.save()
        
        if len(account.get_community()) == 0:
            community = Community.objects.get_or_create(name="Default")[0]

            m1 = Membership.objects.create(account=account, community=community)
            m1.save()
        print(account.get_community())
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
    def delete_user(self, request):
        #deletes the user 
        pass
# Get Account API
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
        print(self.request.user.account)
        return self.request.user.account


#https://stackoverflow.com/questions/53460246/django-how-to-update-a-field-for-a-model-on-another-models-creation
# https://docs.djangoproject.com/en/3.2/ref/models/instances/
#https://github.com/andikawilliam/book-review-django/blob/master/andisbook/reviews/views.py