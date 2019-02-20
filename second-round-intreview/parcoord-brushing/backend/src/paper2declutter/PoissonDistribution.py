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
from scipy.optimize import minimize

class PoissonDistribution(object):
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
        self.data = np.random.poisson(self.LAMBDA, self.DATA_SIZE)
        print (self.data, np.sum(self.data))
        
    def genData(self, mu,sigma, n):
        return np.random.normal(mu,sigma,n)
        
    ## test numerical approximation close to analytical one
    def test01(self):
        #see: https://stackoverflow.com/questions/25828184/fitting-to-poisson-histogram
        #see poisson fitting : https://github.com/dhuppenkothen/PoissonFittingTutorial/blob/master/ChandraImageFitting.ipynb
        # see https://stats.stackexchange.com/questions/334067/fitting-frequency-distribution-on-unbalanced-data
        
        #see poisson data set in  https://cran.r-project.org/web/packages/mvabund/mvabund.pdf
        # it has spider data set which is fit on poisson dist in page 45.
        # poisson does not work for large data set!
        # see http://socr.ucla.edu/htmls/SOCR_Distributions.html
        
        # the bins should be of integer width, because poisson is an integer distribution
        entries, bin_edges, patches = plt.hist(self.data, bins=30, range=self.RANGE, normed=True)
        
        # calculate binmiddles
        bin_middles = 0.5*(bin_edges[1:] + bin_edges[:-1])
        
        # poisson function, parameter lamb is the fit parameter
        def poisson(k, lamb):
            return (lamb**k/factorial(k)) * np.exp(-lamb)
        
        # fit with curve_fit
        parameters, cov_matrix = curve_fit(poisson, bin_middles, entries) 
        print(parameters)
        # plot poisson-deviation with fitted parameter
        x_plot = np.linspace(self.RANGE[0], self.RANGE[1], self.DATA_SIZE)
        
        plt.plot(x_plot, poisson(x_plot, *parameters), 'r-', lw=2)
        plt.show()
       
       
    # approximate to gaussian distribution for the generated data set. 
    def test02(self):
        
        
        def poisson(k, lamb):
            """poisson pdf, parameter lamb is the fit parameter"""
            return (lamb**k/factorial(k)) * np.exp(-lamb)
        
        
        def negLogLikelihood(params, data):
            """ the negative log-Likelohood-Function"""
            lnl = - np.sum(np.log(poisson(data, params[0])))
            return lnl
        
        
        # get poisson deviated random numbers
        data = np.random.poisson(2, 1000)
        
        # minimize the negative log-Likelihood
        
        result = minimize(negLogLikelihood,  # function to minimize
                          x0=np.ones(1),     # start value
                          args=(data,),      # additional arguments for function
                          method='Powell',   # minimization method, see docs
                          )
        # result is a scipy optimize result object, the fit parameters 
        # are stored in result.x
        print(result)
        
        # plot poisson-deviation with fitted parameter
        x_plot = np.linspace(0, 20, 1000)
        
        plt.hist(data, bins=np.arange(15) - 0.5, normed=True)
        plt.plot(x_plot, poisson(x_plot, result.x), 'r-', lw=2)
        plt.show()
    
    
        
   
    def start(self):
        pass
                
        #self.test01()
        self.test02()
        

np.random.seed(2018)
mmp = PoissonDistribution()
mmp.start()

    
        
