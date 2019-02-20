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
import scipy
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
from scipy.stats import binom
from sklearn.preprocessing import normalize as probNorm
import timeit
import pandas
import matplotlib.pyplot as plt
from pandas.plotting import parallel_coordinates
import io
import requests
from matplotlib.pyplot import ylabel
import csv
import pandas as pd
from parcoordapp.apps import ParCoordDataFiles
from scipy.stats import gaussian_kde
import seaborn as sns







class DensityPlotBrush(object):
    pass

   #two modes: f1, f3, f4, f8, f23, f28
    
    def plotDensity(self):
        pass
        csvFile = ParCoordDataFiles().getBreastCancerCSV() 
        csvDictReader = csv.DictReader(open(csvFile))
        self.df = pd.read_csv(csvFile)
        data = self.df["f27"].values
        print(data)

#         density = gaussian_kde(data)
#         xs = np.linspace(0,8,200)
#         #density.covariance_factor = lambda : 0.25
#         density._compute_covariance()
#         plt.plot(xs,density(xs))
#         plt.xlim(0,0.5)
#         plt.show()


#         sns.set_style('whitegrid')
#         sns.kdeplot(np.array(data), bw=0.5)

        density = stats.kde.gaussian_kde(data)
        x = np.arange(np.min(data), np.max(data), (1.1*np.max(data) - 0.9*np.min(data)) /1000)
        plt.plot(x, density(x))
        plt.show()

        
    def start(self):
        pass
        #self.pcForFewData()
        #self.scatterPlot()


DensityPlotBrush().plotDensity()