from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser 
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.decorators import login_required, user_passes_test

@csrf_exempt
def register(request):
    if request.method == 'GET':
        return render(request, 'accounts/Register.html')
    
    elif request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            username = data.get('username')
            password = data.get('password')
            role = data.get('role')

            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email already exists'})
            if CustomUser.objects.filter(username=username).exists():
                return JsonResponse({'success': False, 'message': 'Username already exists'})

            user = CustomUser(
                email=email,
                username=username,
                password=make_password(password),  
                role=role
            )
            user.save()

            login(request, user)
            return JsonResponse({'success': True})
        
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})


@csrf_exempt
def loginn(request):
    if request.method == 'GET':
        return render(request, 'accounts/Login.html')

    elif request.method == "POST":
        try:
            data = json.loads(request.body) 
            username = data.get("username")
            password = data.get("password")
            role = data.get("role")

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
               
                return JsonResponse({
                    'status': 'success',
                    'message': 'Login successful',
                    'role': role
                })
            else:
                return JsonResponse({
                    'status': 'error',
                    'message': 'Invalid credentials'
                })

        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            })

@login_required
def home(request):
    if request.user.role != 'user':
        return redirect('login')
    return render(request, 'home/home.html')

@login_required
def home2(request):
    if request.user.role != 'admin':
        return redirect('login')
    return render(request, 'home/home2.html')

def is_admin(user):
    return user.role == 'admin'

@login_required
@user_passes_test(is_admin)
def admin(request):
    return render(request, 'jobs/admin.html')
