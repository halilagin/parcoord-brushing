from django.apps import AppConfig
import os


class ParcoordappConfig(AppConfig):
    name = 'parcoordapp'
    

class ParCoordDataFiles(object):
    pass

    def __init__(self):
        pass
        self.env="REMOTE" # "LOCAL"

        if self.env=="REMOTE":
            self.rootdir="/home/ec2-user/phd/papers/parcoord-brushing/coding/parcoord-brushing"
        else:
            self.rootdir="/home/ec2-user/phd/papers/parcoord-brushing/coding/parcoord-brushing"



    def getIrisCSV(self):
        if self.env=="REMOTE":
            return self.rootdir+"/frontend/public/data/iris.data.csv"
        else:
            return self.rootdir+"/frontend/public/data/iris.data.csv"
