from rest_framework import generics, permissions, mixins, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .models import Account, Community, Membership
from .serializers import UserSerializer, RegisterSerializer, CommunitySerializer, LoginSerializer, AccountSerializer, UpdateScoreSerializer
from json import dumps
# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user= serializer.save()
        token = AuthToken.objects.create(user)[1]
        community = Community.objects.get_or_create(name='Colorado College', zip_code=80903)[0]
        community = Community.objects.get_or_create(name='West Chester', zip_code=19382)[0] 
        community = Community.objects.get_or_create(name='Default', zip_code=80903)[0]
        community = Community.objects.get_or_create(name=request.data["community"])[0]
        username = request.data['username']
        email = request.data['email']
        profile_photo = request.data['profile_photo']
        account = Account.objects.create(user=user,username=username, profile_photo=profile_photo, email=email )
        m1 = Membership.objects.create(account=account, community=community)
        m1.save()

        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data, 
            "account": AccountSerializer(account, 
            context=self.get_serializer_context()).data, 
            "community" : CommunitySerializer(community, 
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
    # def get(self, request):

    #     queryset = Community.objects.all()

    #     # event_filter = self.request.query_params.get('event_filter', None)

    #     # if event_filter == 'last':
    #     #     return [queryset.order_by("-event_id")[0]]
    #     # if event_filter == 'first':
    #     #     return [queryset.order_by("event_id")[0]]
    #     print("quererehsi")

    #     return queryset
    def get(self, request): 
        communities = []


        # https://stackoverflow.com/questions/64829165/how-do-i-properly-use-javascript-axios-get-function-to-call-get-queryset-fu
        for community in Community.objects.all():
            communities.append(CommunitySerializer(community,  context=self.get_serializer_context()).data)
        print("In get communities python")
        print("returning: ")
        print(communities)
        return Response({"communities" :communities})
       

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
        ######################################
        # DELETE LATER--- DEV PURPOSES 
        account.check_score()
        account.email = user.email

        #account.communities  = "Default"
        account.save()

        
        if len(account.get_community()) == 0:
            community = Community.objects.get_or_create(name="Default")[0]

            m1 = Membership.objects.create(account=account, community=community)
            m1.save()
        community = account.get_community()[0]
        return Response({
            "user": UserSerializer(user, 
            context=self.get_serializer_context()).data, 
            "account": AccountSerializer(account, 
            context=self.get_serializer_context()).data, 
            "community": CommunitySerializer(community, context=self.get_serializer_context()).data, 
            "token": token
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get(self, request):
        return self.request.user
    def delete_user(self, request):
        #deletes the user 
        pass
# Get Account API
class UpdateAccountUserApi(generics.RetrieveUpdateAPIView): 
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer
    # def retrieve(self, request, *args, **kwargs):
    #     serializer = self.serializer_class(request.user)
    #     return Response(serializer.data)
    def perforn_update(self, request, *args, **kwargs): 
        print("up")
    def update(self, request, *args, **kwargs):
        print("update")
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        account = self.request.user.account 
        account.update()
        return Response(serializer.data)
class AccountAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer
    def get_object(self):
        account= Account.objects.get(username=self.request.user.account)

       
        return account
    def edit_score(self, amount, type): 


        return self.request.user.account


#https://stackoverflow.com/questions/53460246/django-how-to-update-a-field-for-a-model-on-another-models-creation
# https://docs.djangoproject.com/en/3.2/ref/models/instances/
#https://github.com/andikawilliam/book-review-django/blob/master/andisbook/reviews/views.py