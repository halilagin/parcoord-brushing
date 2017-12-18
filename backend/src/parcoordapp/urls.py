from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^streaming/fetchdata', views.ParallelCoordRest.as_view(), name="ParallelCoordRestV3"),
    url(r'^iris/eigens', views.ParallelCoordIrisEigensRest.as_view(), name="ParallelCoordIrisEigensRestV3"),
    url(r'^iris/fetchData', views.ParallelCoordIrisDataRest.as_view(), name="ParallelCoordIrisDataRestV3"),
    url(r'^iris/kmeans/oftwovars', views.ParallelCoordIrisKmeansRest.as_view(), name="ParallelCoordIrisKmeansRestV3"),
    url(r'^iris/spatialsign/oftwovars', views.ParallelCoordIrisSpatialSignRest.as_view(), name="ParallelCoordIrisSpatialSignRestV3"),
    url(r'^breastcancer/eigens', views.ParallelCoordBreastCancerEigensRest.as_view(), name="ParallelCoordBreastCancerEigensRestV3"),
    url(r'^breastcancer/fetchData', views.ParallelCoordBreastCancerDataRest.as_view(), name="ParallelCoordBreasCancerDataRestV3"),
    url(r'^breastcancer/kmeans/oftwovars', views.ParallelCoordBreastCancerKmeansRest.as_view(), name="ParallelCoordBreastCancerKmeansRestV3"),
    url(r'^breastcancer/spatialsign/oftwovars', views.ParallelCoordBreastCancerSpatialSignRest.as_view(), name="ParallelCoordBreastCancerSpatialSignRestV3"),
    url(r'^userints/save', views.ParCoordUserInteractionDataSaveRest.as_view(), name="ParCoordUserInteractionDataSaveRestV3"),
    url(r'^userints/fetchAll', views.ParCoordUserInteractionDataFetchAllRest.as_view(), name="ParCoordUserInteractionDataSaveRestV3"),
    url(r'^userints/fetchParticipant', views.ParCoordUserInteractionDataFetchParticipantRest.as_view(), name="ParCoordUserInteractionDataFetchParticipantRestV3"),
    url(r'^userints/searchByTestName', views.ParCoordUserInteractionDataFetchTestsByNameRest.as_view(), name="ParCoordUserInteractionDataFetchTestsByNameRestV3"),


    url(r'^paperplots/data/poscorr', views.ParCoordPaperPlotsRest.as_view(), name="ParCoordPaperPlotsRestV3"),


]
urlpatterns = format_suffix_patterns(urlpatterns)



