from rest_framework import generics, permissions, mixins, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

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
        user = serializer.save()

        token = AuthToken.objects.create(user)[1]
        community = Community.objects.get_or_create(
            name='Colorado College', zip_code=80903)[0]
        community = Community.objects.get_or_create(
            name='West Chester', zip_code=19382)[0]
        community = Community.objects.get_or_create(
            name='Default', zip_code=80903)[0]
        community = Community.objects.get(name=request.data["community"])
        username = request.data['username']
        email = request.data['email']
        profile_photo = request.data['profile_photo']
        account = Account.objects.create(
            user=user, username=username, profile_photo=profile_photo, email=email)
        m1 = Membership.objects.create(account=account, community=community)
        m1.save()

        return Response({
            "user": UserSerializer(user,
                                   context=self.get_serializer_context()).data,
            "account": AccountSerializer(account,
                                         context=self.get_serializer_context()).data,
            "community": CommunitySerializer(community,
                                             context=self.get_serializer_context()).data,
            "token": token
        })


class CreateAccountAPI(generics.GenericAPIView):
    serializer_class = AccountSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, account = serializer.save()
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
        community = Community.objects.create(
            name=validated_data["name"], zipcode=validated_data["zip"])
        return Response({
            "community": CommunitySerializer(community,  context=self.get_serializer_context()).data
        })

    def put(self, request, pk):
        # PUT a new user into community
        pass

    def get(self, request):
        communities = []

        # https://stackoverflow.com/questions/64829165/how-do-i-properly-use-javascript-axios-get-function-to-call-get-queryset-fu
        for community in Community.objects.all():
            communities.append(CommunitySerializer(
                community,  context=self.get_serializer_context()).data)

        return Response({"communities": communities})

    @api_view(('GET',))
    @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def get_accounts(self, community):
        community = Community.objects.get(name=community)
        accounts = []
        for account in community.accounts.all():
            accounts.append(AccountSerializer(account).data)
        count = 0
        while (len(accounts) < 5):
            count+=1
            accounts.append({'id': 100+count, 'username': str('DefaultTeam' + str(count)), 'email': str('dummy' + str(count) + '@gmail.com'), 'score': 100*count,
                            'num_submissions': 0, 'profile_photo': '/media/profile_images/Aluminium_cans.jpg', 'communities': ''})
        sorted_accounts = sorted(accounts, key = lambda i: i['score'],reverse=True)[0:5]
        return Response({"accounts": sorted_accounts})

    def change_admin(self):
        # change who the admin is
        pass

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):

       # community = Community.objects.create(name="Default", zip_code=80903)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, account = serializer.validated_data
        token = AuthToken.objects.create(user)[1]
        ######################################
        # DELETE LATER--- DEV PURPOSES
        account.check_score()
        account.email = user.email

        #account.communities  = "Default"
        account.save()

        if len(account.get_community()) == 0:
            community = Community.objects.get_or_create(name="Default")[0]

            m1 = Membership.objects.create(
                account=account, community=community)
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

    def get(self):
        return self.request.user

    def delete_user(self, request):
        # deletes the user
        pass
# Get Account API
# class UpdateAccountUserApi(generics.UpdateAPIView): 
#     permission_classes = (permissions.IsAuthenticated,)
#     serializer_class = AccountSerializer
#     lookup_field = 'username'
#     # def retrieve(self, request, *args, **kwargs):
#     #     serializer = self.serializer_class(request.user)
#     #     return Response(serializer.data)
#     def get_object(self):
#         username = self.kwargs["username"]
#         return get_object_or_404(Account, username=username)
#     def update(self, request, *args, **kwargs):
     
#         serializer = self.serializer_class(request.user, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         account = self.request.user.account 
#         account.update(request.data)
   
#         return Response(request.data)
class AccountAPI(generics.RetrieveUpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer

    def get_object(self):
        account = Account.objects.get(username=self.request.user.account)

        return account
  
    def update(self, request, *args, **kwargs):
        print(request.data)
        account = self.request.user.account 
       

        if 'password' in request.data.keys() and request.data['password'] != 'undefined':
            self.request.user.set_password(request.data['password'])
            self.request.user.save()
            
        if 'community' in request.data.keys() and request.data['community'] != 'undefined': 
           membership = Membership.objects.filter(account =account).first()
           membership.delete()

            
        
           m1 = Membership.objects.create(
                account=account, community=Community.objects.get(name=request.data['community']))
           m1.save()
        
        if User.objects.get(request.data['username']) != None: 
            return Response(request.data)
        account.update(request.data)
       

        return Response(request.data)
   

    def edit_score(self, amount, type):

        return self.request.user.account


# https://stackoverflow.com/questions/53460246/django-how-to-update-a-field-for-a-model-on-another-models-creation
# https://docs.djangoproject.com/en/3.2/ref/models/instances/
# https://github.com/andikawilliam/book-review-django/blob/master/andisbook/reviews/views.py
