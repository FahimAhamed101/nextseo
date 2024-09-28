#from django.shortcuts import render
from django.views.generic import ListView, CreateView
from django.urls import reverse_lazy
from .forms import PostForm,PostSearchForm
from .models import Post
from django.shortcuts import get_object_or_404, render
# Create your views here.
from rest_framework.views import APIView 
from rest_framework import generics, status
from .serializers import *
class HomePageView(ListView):
    
    model = Post
    
    template_name = 'home.html'

class CreatePostView(CreateView): # new
    model = Post
    form_class = PostForm
    template_name = 'post.html'
    success_url = reverse_lazy('home')

def post_single(request, post):
    post = get_object_or_404(Post, slug=post, status='published')
    related = Post.objects.filter(author=post.author)[:5]
    return render(request, 'blog/single_post.html', {'post': post, 'related': related})


class TagListView(ListView):
    model = Post
    paginate_by = 10
    context_object_name = 'posts'

    def get_queryset(self):
        # x = Post.objects.filter(tags__name=self.kwargs['tag'])
        x = Post.objects.filter(status__exact='published', tags__name__in=[self.kwargs['tag']])
        return x

    def get_template_names(self):
        if self.request.htmx:
            return "components/post-list-elements-tags.html"

        return 'blog/tags.html'

    def get_context_data(self, **kwargs):
        context = super(TagListView, self).get_context_data(**kwargs)
        context['tag'] = self.kwargs['tag']

        return context
    
class PostSearchView(ListView):
    model = Post
    paginate_by = 10
    context_object_name = 'posts'
    form_class = PostSearchForm

    def get_queryset(self):
        form = self.form_class(self.request.GET)  # grab data from form
        if form.is_valid():
            return Post.objects.filter(status__exact='published', title__icontains=form.cleaned_data['q'])
        return []

    def get_template_names(self):
        if self.request.htmx:
            return "components/post-list-elements-search.html"
        return 'blog/search.html'
    

from rest_framework.response import Response

class ListPostsapi(generics.ListAPIView):
    
    queryset = Post.objects.all()
    
    serializer_class = PostSerializer
    
    
    

class ListDetailsapi(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Post.objects.all()
    
    serializer_class = PostSerializer
    
    
    