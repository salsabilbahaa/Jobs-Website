from django.db import models

class HomePageSetting(models.Model):
    hero_title = models.CharField(max_length=200, default="Find Your Dream Job")
    hero_subtitle = models.TextField(default="Connect with top employers and discover opportunities that match your skills")
    def __str__(self):
        return "Home Page Settings"