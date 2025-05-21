from django.http import HttpResponseNotFound, JsonResponse
from django.shortcuts import render, redirect
from .models import Job, Application
from django.db.models import Q
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required

def search_job(request):
    jobs = Job.objects.all()
    return render(request, 'jobs/search_job.html', {'jobs': jobs})

@login_required
def apply_job(request, job_id):
    if request.method == 'POST':
        try:
            job = Job.objects.get(job_id=job_id)
            
            # Check if application already exists
            if Application.objects.filter(user=request.user, job=job).exists():
                return JsonResponse({
                    'success': False,
                    'message': 'You have already applied for this job!'
                })
            
            # Create new application
            Application.objects.create(user=request.user, job=job)
            
            return JsonResponse({
                'success': True,
                'message': 'Application submitted successfully!'
            })
            
        except Job.DoesNotExist:
            return JsonResponse({
                'success': False,
                'message': 'Job not found'
            }, status=404)
    
    return JsonResponse({
        'success': False,
        'message': 'Invalid request method'
    }, status=400)

@login_required
def my_applications(request):
    applications = Application.objects.filter(user=request.user).select_related('job')
    return render(request, 'jobs/application.html', {'applications': applications})

def job_detail_ajax(request, job_id):
    try:
        job = Job.objects.get(job_id=job_id)
        data = {
            'title': job.title,
            'job_id': job.job_id,
            'salary': job.salary,
            'company': job.company,
            'status': job.status,
        }
        return JsonResponse(data)
    except Job.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)

def add_job(request):
    
    if request.method == 'POST':
        job_id = request.POST.get('job_id')
        title = request.POST.get('title')
        print(title)
        salary = request.POST.get('salary')
        company = request.POST.get('company')
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
        job.company = request.POST.get('company')
        job.status = request.POST.get('status')
        job.save()
        return redirect('/jobs/admin-jobs/')
    
    return render(request, 'jobs/update_job.html', {'job': job})
def job_list(request):
    search_query = request.GET.get('search', '')
    print("SEARCH QUERY:", search_query)
    if search_query:
        jobs = Job.objects.filter(title__icontains=search_query)
    else:
        jobs = Job.objects.all()
    print("JOBS:", jobs)
    return render(request, 'jobs/admin.html', {'jobs': jobs, 'search': search_query})

def job_details(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    return render(request, 'jobs/job_details.html', {'job': job})

@csrf_protect
@require_http_methods(["DELETE"])
def delete_job(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
        job.delete()
        return JsonResponse({'message': 'done'})
    except Job.DoesNotExist:
        return HttpResponseNotFound('not found')
def logout(request):
   auth_logout(request)
   return redirect('/')