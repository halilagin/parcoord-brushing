'''
Created on Dec 3, 2017

@author: halil
'''


'''
see: http://www.astroml.org/book_figures/chapter3/fig_bivariate_gaussian.html

'''

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse
from astroML.stats.random import bivariate_normal
from astroML.plotting import setup_text_plots
from IPython.display import SVG,display
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import norm
import math
import matplotlib.lines as lines
import matplotlib.patches as patches
from sklearn.mixture import GaussianMixture
from scipy import stats
import scipy
from scipy.optimize import curve_fit
from scipy.misc import factorial
from scipy.stats import chisquare

class ChiSquareTestPoissonDistribution(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        self.DATA_SIZE = 100
        self.RANGE = [0,30]
        self.LAMBDA = 5 #paisson parameter
        # get poisson deviated random numbers
       
        
    def genData(self, mu,sigma, n):
        return np.random.normal(mu,sigma,n)
        
    ## test two generated poisson data set with chi square
    def test01(self):
        #see: https://stackoverflow.com/questions/25828184/fitting-to-poisson-histogram
        #see poisson fitting : https://github.com/dhuppenkothen/PoissonFittingTutorial/blob/master/ChandraImageFitting.ipynb
        # see https://stats.stackexchange.com/questions/334067/fitting-frequency-distribution-on-unbalanced-data
        #see poisson mixture model: https://www.quora.com/When-do-we-use-a-Poisson-mixture-model
        #http://austinrochford.com/posts/2015-03-03-mle-python-statsmodels.html
        #when it is poisson? https://www.youtube.com/watch?v=sv_KXSiorFk
        np.random.seed(2017)
        self.data1 = stats.poisson.rvs(self.LAMBDA, size=self.DATA_SIZE)
        
        np.random.seed(2018)
        self.data2 = stats.poisson.rvs(self.LAMBDA, size=self.DATA_SIZE)
        print (self.data1,self.data2)
        #https://www.youtube.com/watch?v=1Ldl5Zfcm1Y
        # how to interpret chi square results
        # http://courses.wcupa.edu/rbove/Berenson/10th%20ed%20CD-ROM%20topics/section12_5.pdf
        chi = chisquare(self.data1, self.data2)
        print ("chi:",chi)
    
    def lambdaParam(self, data):
        entries, bin_edges, patches = plt.hist(data, bins=30, range=self.RANGE, normed=True)
        
        # calculate binmiddles
        bin_middles = 0.5*(bin_edges[1:] + bin_edges[:-1])
        
        # poisson function, parameter lamb is the fit parameter
        def poisson(k, lamb):
            return (lamb**k/factorial(k)) * np.exp(-lamb)
        
        # fit with curve_fit
        parameters, cov_matrix = curve_fit(poisson, bin_middles, entries) 
        return parameters
       
    
    def test02(self):
        pass
        self.test01()
        lambda1 = self.lambdaParam(self.data1)
        lambda2 = self.lambdaParam(self.data2)
        print (lambda1, lambda1)   
       
    #kl-divergence, entroy of two poisson
    def test03(self):
        pass
        self.test01()
        x1= stats.poisson.pmf(self.data1, self.LAMBDA)
        x2= stats.poisson.pmf(self.data2, self.LAMBDA)

        #x = rv.ppf(self.data1)
        ent = stats.entropy(x1,x2)
        print (ent)   
       
   
    
    
        
   
    def start(self):
        pass
                
        self.test03()
        

mmp = ChiSquareTestPoissonDistribution()
mmp.start()

    
        
