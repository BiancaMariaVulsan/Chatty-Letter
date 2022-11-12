from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from django.utils import timezone

class ChatView(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, default=None, related_name='sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, default=None, related_name='receiver')
    sent_date = models.DateTimeField('date published')
    textcontent = models.TextField(default = 'Hi Hamba !')


    def __str__(self):
        return str(self.id)

    def create_chat(message, senderid, receiverid):
        senderid = int(senderid)
        receiverid = int(receiverid)
        chatnew = ChatView(sender = get_object_or_404(User, id=senderid), receiver = get_object_or_404(User, id=receiverid), sent_date = timezone.now(), textcontent = message)
        chatnew.save()

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
