from django.shortcuts import render, redirect
from .models import Job, Application

def search_jobs(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/search_jobs.html', {'jobs': jobs})

def apply_to_job(request, job_id):
    job = Job.objects.get(pk=job_id)
    Application.objects.create(job=job)
    return redirect('my_applications')

def my_applications(request):
    applications = Application.objects.all()
    return render(request, 'jobs/my_applications.html', {'applications': applications})
