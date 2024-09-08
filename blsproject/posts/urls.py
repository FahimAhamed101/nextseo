from django.urls import path

from . import views

urlpatterns = [
    
    path('',views.CreatePostView.as_view(),name  ='add_post'),
    path("search/", views.PostSearchView.as_view(), name='post_search'),
    path("<slug:post>/", views.post_single, name='post_single'),
    path("tag/<slug:tag>/", views.TagListView.as_view(), name='post_by_tag'),
    path('post/api/', views.ListPostsapi.as_view(), name='api'),
    path('post/api/<int:pk>/', views.ListDetailsapi.as_view()),
]
