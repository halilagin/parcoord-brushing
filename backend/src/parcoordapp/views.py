from django.shortcuts import render
from rest_framework.views import APIView
from code.parallelcoord.ParCoordDataProvider import IrisDataProvider,\
    BreastCancerDataProvider
from rest_framework.response import Response
from code.parallelcoord.ParallelCoordinates import ParallelCoordinates
import os
import pathlib
import json
from code.parallelcoord.ParCoordDataEigens import IrisDataEigens,\
    BreastCancerDataEigens
from code.parallelcoord.ParCoordKmeans import IrisDataKmeans, BreastCancerKmeans
from code.parallelcoord.ParCoordSpatialSign import IrisDataSpatialSign,\
    BreastCancerSpatialSign

# Create your views here.






class ParallelCoordRest(APIView):
    pass
    
    
    def get(self, request):
        distcount = 0
        pc = ParallelCoordinates ()
        
        sessionFilePath = os.path.join(os.getcwd(),"parallel-coord-session-"+str(distcount)+".json")
        print ("sessionFilePath:",sessionFilePath)
        session_ = {}
        
        if pathlib.Path(sessionFilePath).exists():
            print (sessionFilePath)
            with open(sessionFilePath, 'r') as jsonFile:
                session_.update({'data':json.load(jsonFile)})
        
        if 'data' not in session_ :
            print("no session data")
            session_.update({'data': pc.getIrisData()})
                
        if not pathlib.Path(sessionFilePath).exists():
            with open(sessionFilePath, 'w') as outfile:
                json.dump(session_, outfile)
        
        return Response(session_['data'])
    
    
    def post(self, request):
        return self.get(request)
    



class ParallelCoordIrisEigensRest(APIView):
    pass
    
    
    def get(self, request):
        pc = IrisDataEigens ()
        return Response(pc.eigens())
    
    
    def post(self, request):
        return self.get(request)
    
    

class ParallelCoordBreastCancerEigensRest(APIView):
    pass
    
    def get(self, request):
        pc = BreastCancerDataEigens ()
        return Response(pc.eigens())
    
    
    def post(self, request):
        return self.get(request)

class ParallelCoordIrisDataRest(APIView):
    pass
    
    
    def get(self, request):
        pc = IrisDataProvider().getData()
        return Response(pc)
    
    
    def post(self, request):
        return self.get(request)
    

class ParallelCoordBreastCancerDataRest(APIView):
    pass
    
    
    def get(self, request):
        pc = BreastCancerDataProvider().getData()
        return Response(pc)
    
    
    def post(self, request):
        return self.get(request)
    





class ParallelCoordIrisKmeansRest(APIView):
    pass
    
    
    def get(self, request):
        #var1n = "petal_len", var2n = "petal_w" 
        var1 = request.GET.get('var1')
        var2 = request.GET.get('var2')
        K = request.GET.get('K')
        print ("K", int(K))
        pc = IrisDataKmeans().kmeansOfVars(var1, var2, int(K))
        print (pc)
        return Response(pc)
    
    
    def post(self, request):
        return self.get(request)
  
  
class ParallelCoordBreastCancerKmeansRest(APIView):
    pass
    
    
    def get(self, request):
        #var1n = "petal_len", var2n = "petal_w" 
        var1 = request.GET.get('var1')
        var2 = request.GET.get('var2')
        K = request.GET.get('K')
        print ("K", int(K))
        pc = BreastCancerKmeans().kmeansOfVars(var1, var2, int(K))
        print (pc)
        return Response(pc)
    
    
    def post(self, request):
        return self.get(request)  
 
 

class ParallelCoordIrisSpatialSignRest(APIView):
    pass
    
    
    def get(self, request):
        #var1n = "petal_len", var2n = "petal_w" 
        var1 = request.GET.get('var1')
        var2 = request.GET.get('var2')
        pc = IrisDataSpatialSign().produceSSOfTwoVars(var1, var2)
        return Response(pc)
        
    def post(self, request):
        return self.get(request)
    


class ParallelCoordBreastCancerSpatialSignRest(APIView):
    pass
    
    
    def get(self, request):
        #var1n = "petal_len", var2n = "petal_w" 
        var1 = request.GET.get('var1')
        var2 = request.GET.get('var2')
        pc = BreastCancerSpatialSign().produceSSOfTwoVars(var1, var2)
        return Response(pc)
        
    def post(self, request):
        return self.get(request)