from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('search/', views.search_jobs, name='search_job'),
    path('', TemplateView.as_view(template_name='home/home2.html'), name='home'),
    path('apply/<int:job_id>/', views.apply_to_job, name='apply_to_job'),
    path('applications/', views.my_applications, name='my_applications'),
    path('add-job/',views.add_job , name='add_job'),
    path('edit-job/<int:job_id>/', views.update_job, name='edit_job'),
    path('admin-jobs/', views.job_list, name='job_list'),
    path('admin-jobs/delete-job/<int:job_id>/', views.delete_job, name='delete_job'),
    path('job/<int:job_id>/', views.job_details, name='job_details'),
]