from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<code>', views.index, name='index'),
    path('<code>/<name>', views.index, name='index'),
    path('move/<code>/<name>/<move>', views.get_move, name='move'),
    path('update_board/0/0/0/<code>', views.update_board, name='update_board'),
]