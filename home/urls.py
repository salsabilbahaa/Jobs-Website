from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('search-jobs-ajax/', views.search_jobs_ajax, name='search_jobs_ajax'),
]