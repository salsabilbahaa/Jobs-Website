from django.urls import path
from . import views
from django.urls import include
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('', views.home, name='home'),
    path('admin-home/', views.home2, name='admin_home'),
    path('search-jobs-ajax/', views.search_jobs_ajax, name='search_jobs_ajax'),
    path('jobs/', include('jobs.urls')),
    path('logout2/', views.logout2, name='logout2'),
    path('/', views.logout, name='logout'),
]