from django.contrib.auth.models import User
from rest_framework import serializers

from accounts.models import Account
from my_chat.models import ChatView


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'username', 'password', 'avatar']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = Account.objects.create_user(**validated_data)
        return user


class ChatViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatView
        fields = ['id', 'sender', 'receiver', 'sent_date', 'textcontent']
