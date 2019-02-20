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
import pandas as pd

class LinearSeparability(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        
    def getData(self, mu,sigma):
        n = 12 # number of sample to be drawn
        
        samples = []
        dists=[]
        for i in range(2): # iteratively draw samples
            #Z = np.random.choice([2,3]) # latent variable
            dist=[]
            for j in range(n):
                sample = np.random.normal(mu[i], sigma[i], 1)
                dist.append(sample)
                samples.append(sample)
            dists.append(dist)
        return samples, dists

    def calcEM(self, mu, sigma):
        pass
        samples, dists = self.getData(mu, sigma)
        gmm = GaussianMixture(n_components=2)
        gmm.fit(samples)
        return np.array(gmm.means_).ravel().tolist(), np.array(np.sqrt(gmm.covariances_)).ravel().tolist()
        
    def start(self, mu, sigma, filename, saveFile=True):
        pass
                
        samples, dists = self.getData(mu, sigma)
        
        em_mu, em_sigma = self.calcEM(mu, sigma)

        
        
        
        fig, ax = plt.subplots()

        
        #ax = sns.distplot(x, fit=norm, kde=False)
        #sns.distplot(samples, hist=False, color="#d95f02", ax=ax)
        sns.distplot(dists[0], hist=False, color="#d95f02", ax=ax,fit=norm, kde=False)
        sns.distplot(dists[1], hist=False, color="#7570b3", ax=ax,fit=norm, kde=False)
        #sns.distplot(dists[2], hist=False, color="#7570b3", ax=ax)

        
        y_=[-0.002 for arr_ in dists[0] ]
        x_ = [arr_[0] for arr_ in dists[0] ]
        df = pd.DataFrame({'x':x_, 'y':y_})
        sns.regplot('x', 'y',df, fit_reg=False, ax=ax, color='k', marker='x', scatter_kws={"s": 25})


        x_ = [arr_[0] for arr_ in dists[1] ]
        df = pd.DataFrame({'x':x_, 'y':y_})
        sns.regplot('x', 'y',df, fit_reg=False, ax=ax, color='r', marker='+', scatter_kws={"s": 25})

        plt.plot([10, 10], [-0.02, 0.11], linewidth=2)

        
        plt.show()
        if saveFile==True:
            plt.savefig("/Users/halil/Downloads/"+filename, format="svg")
#         sns.distplot(samples)
#         plt.show()
#         
    
np.random.seed(0)

#GENERATE GMM LINES BRUSHES FOR ORIGINAL DATA
mu = [5, 12]
sigma = [3.5, 3.5]
mmp = LinearSeparability()
mmp.start(mu,sigma, "linear-separability.svg")
# 
# # do em for original data. produces gmm lines from the em clusters. do sorting to make brushes sorted. as in original data.
# em_mu, em_sigma = mmp.calcEM(mu, sigma)
# em_zip = np.array([em_mu,em_sigma]).T
# em_zip1= np.sort(em_zip, axis=0)
# em_mu1 = em_zip1.T[0].tolist()
# em_sigma1 = em_zip1.T[1].tolist()
# print (em_mu1,em_sigma1)   
# 
# mmp.start(em_mu1,em_sigma1,"gmmlines2.svg", saveFile=True)

    
        
