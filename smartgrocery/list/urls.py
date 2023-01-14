from django.urls import path
from list import views

urlpatterns = [
    path('', views.ListsAPIView.as_view()),
    path('<str:list_name>/', views.ListAPIView.as_view()),
]