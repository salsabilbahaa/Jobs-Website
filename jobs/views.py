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

def add_job(request):
    
    if request.method == 'POST':
        job_id = request.POST.get('job_id')
        title = request.POST.get('title')
        print(title)
        salary = request.POST.get('salary')
        company = request.POST.get('company_name')
        status = request.POST.get('status')
        x=Job.objects.create(title=title, salary=salary, company=company, status=status, job_id=job_id)
        x.save()
    return render(request, 'jobs/add_job.html')

from django.shortcuts import render, get_object_or_404, redirect

def update_job(request, job_id):
    job = get_object_or_404(Job, pk=job_id)

    if request.method == 'POST':
        job.job_id = request.POST.get('job_id')
        job.title = request.POST.get('title')
        job.salary = request.POST.get('salary')
        job.company = request.POST.get('company_name')
        job.status = request.POST.get('status')
        job.save()
        
    return render(request, 'jobs/update_job.html', {'job': job})
