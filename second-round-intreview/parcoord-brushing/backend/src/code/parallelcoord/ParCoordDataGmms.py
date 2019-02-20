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


import pylab
from parcoordapp.apps import ParCoordDataFiles
from sklearn.mixture import GaussianMixture
import os


class IrisDataGmms(object):
    pass

    def __init__(self):
        
        csvFile = ParCoordDataFiles().getIrisCSV() 
        print ("ParCoordDataEigens.csv", csvFile)
        #"/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parallel-coord/frontend/public/data/iris.data.csv"
        csvDictReader = csv.DictReader(open(csvFile))
        self.df = pd.read_csv(csvFile)
        
        
    def calcEM(self, samples, componentsSize=3):
        pass
        gmms = {}
        np.random.seed(2017)
        for i in range(componentsSize):
            gmm = GaussianMixture(n_components=i+1)
            samples = np.array(samples).reshape(1,-1).T
            gmm.fit(samples)
            
            gmmpredict = gmm.predict(samples).tolist()

            emLabelIndexes = np.array([k for k in range(i+1)])
            gmm_ = np.array([gmm.means_.ravel().tolist(), gmm.covariances_.ravel().tolist()]).T

            gmm_ = np.append(gmm_.T,[emLabelIndexes],axis=0).T
            
            gmm_ = sorted(gmm_, key=lambda a_entry: a_entry[0]) 
            gmm_ = np.array(gmm_)
            

            means = gmm_[:,0].tolist()
            sigmas = gmm_[:,1].tolist()
            ranges = [ [ means[j]-3*sigmas[j],means[j]+3*sigmas[j] ] for j in range(len(means))]
            extent = [np.amin(ranges),np.amax(ranges)]
            gmmVals = {"means": means, "sigmas":sigmas, "gmm":gmm_.tolist(), "predict":gmmpredict, "ranges":ranges, "extent":extent}
            gmms[str(i+1)] = gmmVals
            print("predict:",gmm.predict(samples))
        print (gmms)
        return gmms
    
    def calcIrisEms(self,componentsSize=3):
        pass
    
        vars=['petal_len','petal_w','sepal_len','sepal_w','t_set_ver_vir']
        eigens = {}
        gmms = {}
        for var1 in vars:
            x =np.asfarray(self.df[var1].values, dtype='float')
            print (x)
            gmms[var1] = self.calcEM(x, componentsSize=componentsSize)
        
        return gmms 
    
    def saveEms(self):
        gmms = self.calcIrisEms(componentsSize=3)
        filePath = os.getcwd()+"/iris.gmms.json"
        print (filePath)
        with open(filePath, 'w') as outfile:
                json.dump(gmms, outfile)
        
        #breastcancer
#         gmms = self.calcIrisEMs(componentsSize=3)
#         filePath = os.getcwd()+"/iris.gmms.json"
#         with open(filePath, 'w') as outfile:
#                 json.dump(gmms, outfile)

    def testJsonLoad(self):
        filePath = "/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parcoord-brushing/backend/src/code/parallelcoord/iris.gmms.json"
        
        with open(filePath, 'r') as infile:
            gmms = json.load(infile)
            print (gmms) 
        
#         
IrisDataGmms().saveEms()
# print (IrisDataGmms().calcIrisEms())


#IrisDataGmms().testJsonLoad()


# class BreastCancerDataEigens(object):
#     pass
# 
#     def __init__(self):
#         
#         csvFile = ParCoordDataFiles().getBreastCancerCSV() 
#         print ("getBreastCancerCSV.csv", csvFile)
#         #"/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parallel-coord/frontend/public/data/iris.data.csv"
#         csvDictReader = csv.DictReader(open(csvFile))
#                                        
#         self.df = pd.read_csv(csvFile)
#         
#     
#     def eigens(self):
#         pass
#     
#         vars=['class']
#         for i in np.arange(1,31,1):
#             vars.append('f'+str(i))
#         eigens = {}
#         for var1 in vars:
#             for var2 in vars:
#                 if var1==var2:
#                     continue
#                 x =np.asfarray(self.df[var1].values, dtype='float')
#                 y =np.asfarray(self.df[var2].values, dtype='float')
#                 x_extent = [np.min(x),np.max(x)]
#                 y_extent = [np.min(y),np.max(y)]
#                 extents = [x_extent, y_extent]
#                 m1 = np.mean(x)
#                 m2 = np.mean(y)
#                 X = np.vstack((x,y))
#                 cov_ = np.cov(X)
#                 corr_ = np.ma.corrcoef(X)
#                 #cov_ = corr_
#                 invconv_ = np.linalg.inv(cov_)
#                 
#                 lambda_1, v1 = np.linalg.eig(corr_)
#                 lambda_1 = np.sqrt(lambda_1)
#                 
#                 #angle_ = np.rad2deg(np.arccos(v1[0, 0]))
#                 #https://stackoverflow.com/questions/20126061/creating-a-confidence-ellipses-in-a-sccatterplot-using-matplotlib
#                 angle_ = np.degrees(np.arctan2(*v1[:,0][::-1]))
# 
#                 
#                 eigens[var1+"___"+var2] = { 
#                                "eigvals":lambda_1.tolist(), 
#                                "eigvecs":v1.tolist(), 
#                                "angle":angle_, 
#                                "cov":cov_.tolist(), 
#                                "corr":corr_.tolist(), 
#                                
#                                "invcov":invconv_.tolist(), 
#                                "extents":extents,
#                                "m1":m1,
#                                "m2":m2}
#         #print ("eigens", eigens)
#         return eigens

#print(BreastCancerDataEigens().eigens())