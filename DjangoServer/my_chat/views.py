import ast

from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.response import Response

from my_chat.models import ChatView
from my_chat.serializers import UserSerializer, ChatViewSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

class ChatViewViewSet(viewsets.ModelViewSet):
    queryset = ChatView.objects.all()
    serializer_class = ChatViewSerializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
            'username': user.username
        })

@csrf_exempt
def create_new_chat(request):
    if request.method == "POST":
        querydictstr = request.body.decode('UTF-8')
        querydict = ast.literal_eval(querydictstr)
        ChatView.create_chat(querydict['textcontent'], querydict['sender'], querydict['receiver'])
    return HttpResponse()

@api_view(('POST',))
@csrf_exempt
def signup(request):
    if request.method == "POST":
        querydictstr = request.body.decode('UTF-8')
        querydict = ast.literal_eval(querydictstr)
        user = User.objects.create_user(querydict['username'], None, querydict['password'])
        return Response({
            'user_id': user.id,
            'username': user.username
        })


@csrf_exempt
def get_current_user_id(request):
    print(request.user.id)
    return HttpResponse(request.user.id)
