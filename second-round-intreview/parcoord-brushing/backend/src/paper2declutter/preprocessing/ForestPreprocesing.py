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
import pandas as pd
from scipy.optimize import minimize


class ForestPreprocessing(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        self.filepath="/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/declutter-pc-temporal/backend/src/data/forestfires.csv"
        self.filepath010="/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/declutter-pc-temporal/backend/src/data/forestfires.csv.010.datefixed.csv"
        self.filepath020="/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/declutter-pc-temporal/backend/src/data/forestfires.csv.020.month.poissoncounters.csv"
        self.filepath030="/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/declutter-pc-temporal/backend/src/data/forestfires.csv.030.weekday.poissoncounters.csv"
        
        self.df = pd.read_csv(self.filepath, delimiter=';')
        self.months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
        self.wdays = ['mon','tue','wed','thu','fri','sat','sun']
    ## test numerical approximation close to analytical one
    def test01DummyRead(self):
        pass
        print (self.df)
        
    def test02CheckMissingValues(self):
        pass
        print (self.df.isnull().values.sum())
       
    # approximate to gaussian distribution for the generated data set. 
    def test03MakeDateNumeric(self):
        
        #df2 = (self.df['month']  == 'oct')
        for month_ in self.months:
            self.df.month[self.df.month==month_] = self.months.index(month_)+1
        
        for wday_ in self.wdays:
            self.df.day[self.df.day==wday_] = self.wdays.index(wday_)+1
            
        self.df.to_csv(self.filepath010, sep=';',index= False)
        print (self.df)
        pass
     
    def test04AddMonthPoissonCounters(self):
        self.df = pd.read_csv(self.filepath010, delimiter=';')
        monthcounts = self.df['month'].value_counts()
        self.df['month_firecount'] = 1
        for idx,item in monthcounts.iteritems():
            self.df.month_firecount[self.df.month==idx]=item
        
        self.df.to_csv(self.filepath020, sep=';',index= False)

    def test05AddWeeklyPoissonCounters(self):
        self.df = pd.read_csv(self.filepath020, delimiter=';')
        daycounts = self.df['day'].value_counts()
        print (daycounts)
        self.df['weekday_firecount'] = 1
        for idx,item in daycounts.iteritems():
            self.df.weekday_firecount[self.df.day==idx]=item
         
        self.df.to_csv(self.filepath030, sep=';',index= False)

    def poissonParam1(self, data_):
        min_=np.min(data_)
        if min_<0:
            min_=0
        RANGE = [min_, np.sum(data_)+1]
        print ("range", RANGE)
        # the bins should be of integer width, because poisson is an integer distribution
        entries, bin_edges, patches = plt.hist(data_, bins=30, range=RANGE, normed=True)
        
        # calculate binmiddles
        bin_middles = 0.5*(bin_edges[1:] + bin_edges[:-1])
        
        # poisson function, parameter lamb is the fit parameter
        def poisson(k, lamb):
            return (lamb**k/factorial(k)) * np.exp(-lamb)
        
        # fit with curve_fit
        parameters, cov_matrix = curve_fit(poisson, bin_middles, entries) 
        return parameters[0]
    
    def poissonParam2(self, data_):
        # poisson function, parameter lamb is the fit parameter
        def poisson(k, lamb):
            """poisson pdf, parameter lamb is the fit parameter"""
            return (lamb**k/factorial(k)) * np.exp(-lamb)
        
        
        def negLogLikelihood(params, data):
            """ the negative log-Likelohood-Function"""
            lnl = - np.sum(np.log(poisson(data, params[0])))
            return lnl
        
        result = minimize(negLogLikelihood,  # function to minimize
                  x0=np.ones(1),     # start value
                  args=(data_,),      # additional arguments for function
                  method='Powell',   # minimization method, see docs
                  )
        
        # fit with curve_fit, result.x = poisson_lambda
        return result.x
        
    def test06EstimateLambdaOfMonthlyPoisson(self):
        self.df = pd.read_csv(self.filepath030, delimiter=';')
        monthIndices = np.arange(1,len(self.months)+1)
        DATA_SIZE = 12 #len(monthIndices)
        month_firecounts = []
        for i in monthIndices:
            firecount = self.df.month_firecount[self.df.month==i].iloc[0]
            month_firecounts.append(firecount) #zeroth month has this firecount
        month_firecounts = np.sort(month_firecounts, axis=0)
        print (month_firecounts)
        #print (np.sort(np.unique(month_firecounts)))
        synthetic_data= np.random.poisson(np.sum(month_firecounts)/DATA_SIZE, DATA_SIZE)
        
        data = month_firecounts
        #data = synthetic_data
        
        lambda_ = self.poissonParam2(data )
        print ("poisson.lambda",lambda_)
        predicted = stats.poisson.rvs(lambda_, size=DATA_SIZE)
        print (np.sum(data))
        print (np.sum(predicted))
        
   
    def start(self):
        pass
                
        #self.test01DummyRead()
        #self.test02CheckMissingValues()
#         self.test03MakeDateNumeric()
#         self.test04AddMonthPoissonCounters()
#         self.test05AddWeeklyPoissonCounters()
        self.test06EstimateLambdaOfMonthlyPoisson()
        
        
np.random.seed(2018)
mmp = ForestPreprocessing()
mmp.start()

    
        
