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

class MultiModePlot(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        
    def getData(self, mu,sigma):
        n = 10000 # number of sample to be drawn
        
        samples = []
        dists=[]
        for i in range(3): # iteratively draw samples
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
        gmm = GaussianMixture(n_components=3)
        gmm.fit(samples)
        return np.array(gmm.means_).ravel().tolist(), np.array(np.sqrt(gmm.covariances_)).ravel().tolist()
        
    def start(self, mu, sigma, filename, saveFile=True):
        pass
                
        samples, dists = self.getData(mu, sigma)
        
        
        print (len(samples))
        
        
        fig, ax = plt.subplots()

        
        sns.distplot(samples, hist=False, color="#d95f02", ax=ax)
        sns.distplot(dists[0], hist=False, color="#7570b3", ax=ax)
        sns.distplot(dists[1], hist=False, color="#7570b3", ax=ax)
        sns.distplot(dists[2], hist=False, color="#7570b3", ax=ax)


        #plt.ylim([-0.25,0.25])
        lines = []
        for i in range(3):
            lines.append({
                           "xs": [mu[i]-sigma[i]*3,mu[i]+sigma[i]*3],
                           "ys":[-0.05-0.03*i,-0.05-0.03*i]
                        })
        print (lines)
        for i in range(3):
            plt.plot(lines[i]["xs"], lines[i]["ys"], 'k-', color="#1b9e77", lw=1)
            ax.annotate(r'$\mathcal{N}_'+str(i+1)+'$', xy=(lines[i]["xs"][0]-1,lines[i]["ys"][0]), xytext=(lines[i]["xs"][0]-2,lines[i]["ys"][0]))
        


        rect1 = patches.Rectangle(
            (0, -0.03),2, -0.03 , fill=False,
            linewidth=None      # Default
            )
        ax.add_patch(rect1)
        
        rect2 = patches.Rectangle(
            (10, -0.03),2, -0.1 , fill=False,
            linewidth=None      # Default
            )
        ax.add_patch(rect2)
        
        rect3 = patches.Rectangle(
            (18, -0.05),2, -0.1 , fill=False,
            linewidth=None      # Default
            )
        ax.add_patch(rect3)
        
        plt.show()
        if saveFile==True:
            plt.savefig("/Users/halil/Downloads/"+filename, format="svg")
#         sns.distplot(samples)
#         plt.show()
#         
    

##GENERATE GMM LINES BRUSHES FOR ORIGINAL DATA
# mu = [5, 12, 18]
# sigma = [2, 3, 3]
# mmp = MultiModePlot()
# mmp.start(mu,sigma, "gmmlines1.svg")
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

    
        
