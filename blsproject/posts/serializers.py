from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import *

import json


class PostSerializer(serializers.ModelSerializer):
    
    



    class Meta:
        model = Post
        fields = ['id','title','image' ]
        depth = 0