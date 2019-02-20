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
from sklearn import datasets, linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, MinMaxScaler
import timeit
import csv
import pandas as pd
from matplotlib.patches import Ellipse
from matplotlib.backends.backend_pdf import PdfPages
import seaborn as sns

import pylab



class IrisDataScatterPlot(object):
    pass

    def __init__(self):
        csvFile = "/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parcoord-brushing/frontend/public/data/iris.data.csv"
        csvDictReader = csv.DictReader(open(csvFile))
        self.df = pd.read_csv(csvFile)
        
    
    def test1(self):
        pass
    
        df = sns.load_dataset('iris')

        # use the function regplot to make a scatterplot
        #sns.regplot(x=df["petal_length"], y=df["sepal_length"], fit_reg=True)
        sns.regplot(x=df["petal_width"], y=df["sepal_length"], fit_reg=False)
        #5.843333333333334 0.408922277351
        
        plt.show()
        
    def test3(self):
        df = sns.load_dataset('iris')

        # use the function regplot to make a scatterplot
        x=df["petal_length"].values
        y=df["sepal_length"].values
        #5.843333333333334 0.408922277351
        myData = pd.DataFrame({'x' :  x, 'y': y})

        sns.lmplot("x", "y", data=myData, fit_reg=True)
        min_ = np.min(x)
        max_ = np.max(x)
        linepoints_x=  np.linspace(min_,max_,1000)
        true_coefs =  [4.3066034150475785, 0.40892227735118541]
        
        standarscaled = [5.8433333333333337, 0.40892227735118536]
        newcoefs = [-0.098974216341799467, 0.67017817676999847]
        coefs = standarscaled 
        
        linepoints_y=  [ coefs[0]+coefs[1]*x for x  in linepoints_x ]
        
        plt.plot(linepoints_x, linepoints_y, 'r')
        plt.show()
        

    def test2(self):
        pass
    
        df = sns.load_dataset('iris')
        
        # use the function regplot to make a scatterplot
        x=np.array(df["petal_length"].values)
        y=np.array(df["sepal_length"].values)

        
        #step.1 first find classic regression coeefficients
        regr = linear_model.LinearRegression()
        regr.fit(x.reshape(-1,1),y)
        print('1.[intercept, slop]:', [regr.intercept_,regr.coef_[0] ])
#         sns.regplot(x=x, y=y, fit_reg=True)
#         plt.show()
    
    
        ## step.2 now find the same coefs with centered values (normilized and centered)
        ## one scaler useed for both dimensions
        scaler = MinMaxScaler(feature_range=(0, 1))
        data = np.array([x,y]).T
        scaler.fit(data)
        centered = scaler.transform(data)

        #print(data[:,0].reshape(-1,1))
        regr = linear_model.LinearRegression()
        regr.fit(centered[:,0].reshape(-1,1), centered[:,1])
        coefs = [regr.intercept_,regr.coef_[0] ]
         
        print ("2.centered. [intercept, slop]:",coefs)
         
        
        coefs[0] = scaler.inverse_transform([[coefs[0],0]])
        print('2.transformedback. [intercept, slop]: \n',coefs)


        sns.regplot(x=centered[:,0], y=centered[:,1], fit_reg=True)
        plt.show()
        
        
        ## step 3. do the same trasnformation in step2. but this time use different scales for x and y, scalex and scaley.
        
        
    def start(self):
        pass
        self.test1()

IrisDataScatterPlot().start()

 
# import matplotlib.pyplot as plt
# import numpy as np
# from sklearn import datasets, linear_model
# from sklearn.metrics import mean_squared_error, r2_score
#  
# # Load the diabetes dataset
# diabetes = datasets.load_diabetes()
#  
#  
# # Use only one feature
# diabetes_X = diabetes.data[:, np.newaxis, 2]
#  
# # Split the data into training/testing sets
# diabetes_X_train = diabetes_X[:-20]
# diabetes_X_test = diabetes_X[-20:]
#  
# # Split the targets into training/testing sets
# diabetes_y_train = diabetes.target[:-20]
# diabetes_y_test = diabetes.target[-20:]
#  
# # Create linear regression object
# regr = linear_model.LinearRegression()
# 
# # Train the model using the training sets
# regr.fit(diabetes_X_train, diabetes_y_train)
# 
# print(diabetes_X_train,diabetes_y_train)