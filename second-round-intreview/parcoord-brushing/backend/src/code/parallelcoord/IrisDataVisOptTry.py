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



class IrisDataVisOptTry(object):
    pass

    def __init__(self):
        csvFile = "/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parcoord-brushing/frontend/public/data/iris.data.csv"
        csvDictReader = csv.DictReader(open(csvFile))
        self.df = pd.read_csv(csvFile)
    
    def test1(self):
        pass
    
      
        linepoints_x=  np.linspace(-1,1,40)
        thetas=  np.linspace(0,2*math.pi,40)
        print (linepoints_x, thetas)
        for theta in thetas:
            theta1 = math.cos(theta)
            theta2 = math.sin(theta)
            linepoints_y = [ theta1*x+theta2 for x in linepoints_x  ]
            plt.plot(linepoints_x, linepoints_y, 'r')
            plt.plot(linepoints_y, linepoints_x, 'r')

        plt.show()
        
    
    def test2(self):


        iterations = 1500
        alpha = 0.01
        
        ## Add a columns of 1s as intercept to X. This becomes the 2nd column
        X_df['intercept'] = 1
        
        ## Transform to Numpy arrays for easier matrix math
        ## and start beta at 0, 0
        X = np.array(X_df)
        y = np.array(y_df).flatten()
        beta = np.array([0, 0])

        def cost_function(X, y, beta):
            """
            cost_function(X, y, beta) computes the cost of using beta as the
            parameter for linear regression to fit the data points in X and y
            """
            ## number of training examples
            m = len(y)
        
            ## Calculate the cost with the given parameters
            J = np.sum((X.dot(beta)-y)**2)/2/m
        
            return J
        
        def gradient_descent(X, y, beta, alpha, iterations):
            """
            gradient_descent() performs gradient descent to learn beta by
            taking num_iters gradient steps with learning rate alpha
            """
            cost_history = [0] * iterations
        
            for iteration in range(iterations):
                hypothesis = X.dot(beta)
                loss = hypothesis-y
                gradient = X.T.dot(loss)/m
                beta = beta - alpha*gradient
                cost = cost_function(X, y, beta)
                cost_history[iteration] = cost
        
                ## If you really want to merge everything in one line:
                # beta = beta - alpha * (X.T.dot(X.dot(beta)-y)/m)
                # cost = cost_function(X, y, beta)
                # cost_history[iteration] = cost
        
            return beta, cost_history
        
        (b, c) = gradient_descent(X, y, beta, alpha, iterations)

    
    def start(self):
        pass
        self.test1()

IrisDataVisOptTry().start()

 
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