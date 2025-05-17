from django.db import models

class Job(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('close', 'Closed'),
    ]
    title = models.CharField(max_length=100)
    salary = models.IntegerField()
    company = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return self.title

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    date_applied = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.job.title} - {self.date_applied}"