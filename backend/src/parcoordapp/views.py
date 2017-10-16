from django.shortcuts import render
from rest_framework.views import APIView
from code.parallelcoord.ParCoordDataProvider import IrisDataProvider,\
    BreastCancerDataProvider
from rest_framework.response import Response
from code.parallelcoord.ParallelCoordinates import ParallelCoordinates
import os
import pathlib
import json
import ast
from code.parallelcoord.ParCoordDataEigens import IrisDataEigens,\
    BreastCancerDataEigens
from code.parallelcoord.ParCoordKmeans import IrisDataKmeans, BreastCancerKmeans
from code.parallelcoord.ParCoordSpatialSign import IrisDataSpatialSign,\
    BreastCancerSpatialSign
from django.db import transaction
from parcoordapp.models import ParCoordUserInteractionModel
import codecs

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
    



class ParCoordUserInteractionDataSaveRest(APIView):
    pass
    
   
    def get(self, request):
        
        return Response({})
    
    @transaction.atomic
    def post(self, request):
        payload = json.loads(request.read().decode('utf-8'))
        print(payload)
#         reader = codecs.getreader("utf-8")
#         
#         payload=json.loads(request.body)
#         print("request.body:",payload)

        uid = ParCoordUserInteractionModel()
        uid.data = str(payload["data"])
        uid.userName=payload["userName"]
        uid.personName=payload["personName"]
        uid.save()
        return self.get(request)
    
#    


class ParCoordUserInteractionDataFetchAllRest(APIView):
    pass
    
   
    def post(self, request, userinteraction_id):
        uid = ParCoordUserInteractionModel.objects.all()
        
        return Response(json.loads(uid.data))
    
    def get(self, request, userinteraction_id):
        
        return self.post(request, userinteraction_id)




class ParCoordUserInteractionDataFetchParticipantRest(APIView):
    pass
    
   
    def post(self, request):
        js = json.loads(request.body)
        id = int (js["id"])
        obj = ParCoordUserInteractionModel.objects.get(pk=id);
        data = json.dumps(ast.literal_eval(obj.data))
        return Response(data)
    