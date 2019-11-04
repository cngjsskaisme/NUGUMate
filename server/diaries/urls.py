from django.urls import path

from . import views

app_name = 'diaries'

urlpatterns = [
    path('', views.index, name='index'), 
    #path('test1/<int:echo>', views.test1, name='test1'), 
    path('test', views.test, name='test2'),
]