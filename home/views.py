from django.shortcuts import render
from django.http import JsonResponse
from jobs.models import Job  # Import the Job model from jobs app
from django.db.models import Q
from django.contrib.auth import logout as auth_logout
from django.shortcuts import redirect
import re  # Add this import for regular expressions

def home(request):
    # Get open jobs for the featured section (limit to 3)
    featured_jobs = Job.objects.filter(status__iexact='open').order_by('-id')[:3]
    context = {
        'featured_jobs': featured_jobs
    }
    return render(request, 'home/home.html', context)

def home2(request):
    # Check if user is authenticated and is an admin/staff
    if not request.user.is_authenticated or not request.user.is_staff:
        return redirect('login')  # Redirect non-admins to login page
    
    # Get open jobs for the featured section (limit to 3)
    featured_jobs = Job.objects.filter(status__iexact='open').order_by('-id')[:3]
    context = {
        'featured_jobs': featured_jobs
    }
    
    return render(request, 'home/home2.html', context)  

def extract_years_from_experience(experience_str):
    if not experience_str:
        return 0
    # Find numbers in the string
    numbers = re.findall(r'\d+', experience_str)
    if numbers:
        # Return the first number found
        return int(numbers[0])
    return 0
    
def search_jobs_ajax(request):
    try:
        query = request.GET.get('query', '')
        experience = request.GET.get('experience', '')
        # Start with all jobs
        job_queryset = Job.objects.all()

        # Filter by keyword (in title or company)
        if query:
            job_queryset = job_queryset.filter(
                Q(title__icontains=query) | 
                Q(company__icontains=query)
            )

        # Filter by experience level
        if experience:
            if experience == '0-1':
                # Find jobs with experience requirement of 0-1 years
                filtered_jobs = []
                for job in job_queryset:
                    years = extract_years_from_experience(job.experience)
                    if years <= 1:
                        filtered_jobs.append(job.id)
                job_queryset = job_queryset.filter(id__in=filtered_jobs)
            elif experience == '1-3':
                # Find jobs with experience requirement of 1-3 years
                filtered_jobs = []
                for job in job_queryset:
                    years = extract_years_from_experience(job.experience)
                    if 1 <= years <= 3:
                        filtered_jobs.append(job.id)
                job_queryset = job_queryset.filter(id__in=filtered_jobs)
            elif experience == '3-5':
                # Find jobs with experience requirement of 3-5 years
                filtered_jobs = []
                for job in job_queryset:
                    years = extract_years_from_experience(job.experience)
                    if 3 <= years <= 5:
                        filtered_jobs.append(job.id)
                job_queryset = job_queryset.filter(id__in=filtered_jobs)
            elif experience == '5+':
                # Find jobs with experience requirement of 5+ years
                filtered_jobs = []
                for job in job_queryset:
                    years = extract_years_from_experience(job.experience)
                    if years >= 5:
                        filtered_jobs.append(job.id)
                job_queryset = job_queryset.filter(id__in=filtered_jobs)

        # Convert queryset to list of dictionaries for JSON response
        jobs_data = []
        for job in job_queryset:
            jobs_data.append({
                'id': job.id,
                'title': job.title,
                'company': job.company,
                'experience': job.experience if hasattr(job, 'experience') else 'Not specified',
                'salary': job.salary if hasattr(job, 'salary') else 'Not specified',
                'status': job.status if hasattr(job, 'status') else '',
                'description': job.description if hasattr(job, 'description') else ''
            })

        return JsonResponse({'jobs': jobs_data})
    
    except Exception as e:
        # Return error information for debugging
        import traceback
        return JsonResponse({
            'error': str(e),
            'traceback': traceback.format_exc()
        }, status=500)

def logout(request):
   auth_logout(request)
   return redirect('/')

def logout2(request):
  auth_logout(request)
  return redirect('/accounts/admin')