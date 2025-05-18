from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_jobs, name='search_job'),
    path('apply/<int:job_id>/', views.apply_to_job, name='apply_to_job'),
    path('applications/', views.my_applications, name='my_applications'),
    path('add-job/',views.add_job , name='add_job'),

]