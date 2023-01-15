from django.urls import path
from list import views

urlpatterns = [
    path('', views.ListsAPIView.as_view()),
    path('<str:list_name>/', views.ListAPIView.as_view()),
    path('<str:list_name>/clear/', views.clear_list),
    path('<str:list_name>/<str:item_name>/', views.ItemAPIView.as_view()),
]