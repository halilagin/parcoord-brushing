from django.apps import AppConfig
import os


class ParcoordappConfig(AppConfig):
    name = 'parcoordapp'
    

class ParCoordDataFiles(object):
    pass

    def __init__(self):
        pass
        self.env="LOCAL" # "LOCAL"

        if self.env=="REMOTE":
            self.rootdir="/home/ec2-user/phd/papers/parcoord-brushing/coding/parcoord-brushing"
        else:
            self.rootdir="/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parcoord-brushing"



    def getIrisCSV(self):
        return self.rootdir+"/frontend/public/data/iris.data.csv"
        

    def getBreastCancerCSV(self):
        return self.rootdir+"/frontend/public/data/wdbc.data.csv"
        
