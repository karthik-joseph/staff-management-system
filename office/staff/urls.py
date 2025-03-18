from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('view_employee', views.view_employee, name='view_employee'),
    path('add_employee', views.add_employee, name='add_employee'),
    path('delete_employee', views.delete_employee, name='delete_employee'),
    path('filter_employee', views.filter_employee, name='filter_employee'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
