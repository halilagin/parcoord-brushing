"""
Inferring a binomial proportion via exact mathematical analysis.
"""
import sys
import numpy as np
from scipy.stats import beta
from scipy.special import beta as beta_func
import matplotlib.pyplot as plt
import matplotlib.patches as patches
#from HDIofICDF import *
from scipy.optimize import fmin
#from scipy.stats import *
from scipy.stats import beta
from scipy import special
from scipy import stats
import random
from scipy.special.basic import bernoulli
import math
from pylab import mlab
import json
from builtins import staticmethod
import copy
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C
from sklearn.gaussian_process import GaussianProcessClassifier

import timeit
import csv
import pandas as pd
from matplotlib.patches import Ellipse
import io

import pylab
from code.parallelcoord.ParCoordDataEigens import IrisDataEigens,\
    BreastCancerDataEigens
from parcoordapp.apps import ParCoordDataFiles




class IrisDataProvider(object):
    pass

    def __init__(self):
        csvFile = ParCoordDataFiles().getIrisCSV()
        #"/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parallel-coord/frontend/public/data/iris.data.csv"
        self.csvDictReader = csv.DictReader(open(csvFile))
        self.df = pd.read_csv(csvFile)
        
    
    def getData(self):
        pass
        csv = [ row for row in self.csvDictReader ] 
        eigens = IrisDataEigens().eigens()

        return {"csv":csv, "eigens":eigens}
        



class BreastCancerDataProvider(object):
    pass

    def __init__(self):
        #csvFile = ParCoordDataFiles().getBreastCancerCSV()
        #data = pd.read_csv(csvFile)
        #self.csv = data.transpose().to_dict().values()

        #"/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parallel-coord/frontend/public/data/iris.data.csv"
        #self.csvDictReader = csv.DictReader(open(csvFile),quoting=csv.QUOTE_NONNUMERIC)
        #self.df = pd.read_csv(csvFile)
        pass
    
    
    def getDataForDump(self):
        pass
        #csv = [ row for row in self.csvDictReader ] 
        
        eigens = BreastCancerDataEigens().eigens()
        csvFile = ParCoordDataFiles().getBreastCancerCSV()
        vars=['class']
        for i in np.arange(1,31,1):
            vars.append('f'+str(i))
        data = pd.read_csv(csvFile, usecols=vars)
        csv = list(data.transpose().to_dict().values())
        
        response = {"csv":csv, "eigens":eigens}
        print ("response",response)
        return response
    
    def dumpJsonData(self):
        
        dumpFile = ParCoordDataFiles().getBreastCancerCSV()+".json.dump"
        data = self.getDataForDump()
        
        # Write JSON file
        with io.open(dumpFile, 'w', encoding='utf8') as outfile:
            str_ = json.dumps(data,
                              indent=4, sort_keys=True,
                              separators=(',', ': '), ensure_ascii=False)
            outfile.write(str(str_))
    
    def loadJsonData(self):
        pass
        # Read JSON file
        dumpFile = ParCoordDataFiles().getBreastCancerCSV()+".json.dump"

        res = None
        with open(dumpFile) as data_file:
            res = json.load(data_file)
        return res
            
    def getData(self):
        pass
        return self.loadJsonData()
        

BreastCancerDataProvider().dumpJsonData()
#sBreastCancerDataProvider().loadJsonData()
#IrisDataProvider().getData()
