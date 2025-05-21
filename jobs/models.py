from django.db import models
from django.conf import settings

class Job(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('close', 'Closed'),
    ]
    job_id = models.CharField(max_length=50, unique=True,default='default123') 
    title = models.CharField(max_length=100)
    salary = models.IntegerField()
    company = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.title} at {self.company}"

class Application(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Changed from User
        on_delete=models.CASCADE
    )
    job = models.ForeignKey('Job', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'job')
    
    def __str__(self):
        return f"{self.user.username} applied for {self.job.title}"