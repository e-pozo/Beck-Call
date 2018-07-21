from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'options', views.OptionViewSet)

#router.register(r'company/(?P<pk>[0-9]+)/stocks/?length=(?P<length>[0-9]+)$', views.StockList.as_view())

urlpatterns = [
    url(r'', include(router.urls)),
    url(r'^company/(?P<pk>\d+)/stocks/$', views.StockList.as_view()),
    url(r'company/$', views.CompanyListCreateView.as_view()),
    url(r'company/(?P<pk>\d+)/$', views.CompanyUpdateDestroyView.as_view(), name="company-detail"),
    url(r'calculation/', views.getCalculation),
    url(r'company/(?P<pk>\d+)/options/$', views.CompanyOptionList.as_view()),
    url(r'company/(?P<pk>\d+)/options/(?P<opt_id>[0-9]+)/edit/$', views.CompanyOptionUpdate.as_view()),
    url(r'company/(?P<pk>\d+)/options/(?P<opt_id>[0-9]+)/delete/$', views.CompanyOptionDelete.as_view()),
]