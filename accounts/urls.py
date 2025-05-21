from django.urls import path
from . import views
from django.urls import include
urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.loginn, name='login'),  
    path('home/', views.home, name='home'),  
    path('home2/', views.home2, name='home2'),  
    path('admin/', include('jobs.urls')) 
]
