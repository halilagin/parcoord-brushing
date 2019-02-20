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

class OneDimDensityPlot(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        
    def genData(self, mu,sigma, n):
        return np.random.normal(mu,sigma,n)
        
    ## test numerical approximation close to analytical one
    def test01(self):
        data = self.genData(mu, sigma, 100000)
        stats_ =  stats.describe(data)
        print (stats_.variance)
        v1 = [mu,sigma*sigma]
        v2 = [stats_.mean,stats_.variance]
        
        costheta = scipy.spatial.distance.cosine(v1,v2 )
        similarity = "numerical estimation is very close to analytical values (<0.01)" if costheta<0.01  else "numerical estimation is not close to analytical values (>0.01)"
        print (similarity)
        
        
    ## generate high cluttered data set, reduce the density and compare the descriptive stats between original one and reduced one.
    
    def test02(self):
        np.random.seed(2018)
        reductionRate=0.01
        dataSize=100000
        mu=5
        sigma=2
        binWidth = 0.1
        
        data = self.genData(mu, sigma, dataSize)
        data = np.sort(data, axis=None) 
        stats_ =  stats.describe(data)
        
        def genBins(mu_,sigma_, binsize_, binwidth_):
            bins = []
            for i in range(binsize_):
                binExtent = [mu_-3*sigma_+i*binwidth_, mu_-3*sigma_+(i+1)*binwidth_]
                bins.append({"binExtent":binExtent})
            return bins
        
        
        binSize= round(6*sigma/binWidth)
        bins = genBins(mu,sigma,binSize, binWidth)
        
        hist, bin_edges  = np.histogram(data, bins=binSize, density=False)
        print ("range", np.min(data), np.max(data))
        print (hist)
        
        
   
    def start(self, mu, sigma, filename, saveFile=True):
        pass
                
        self.test02()
        
        
#         fig, ax = plt.subplots()
# 
#         
#         sns.distplot(samples, hist=False, color="#d95f02", ax=ax)
#         sns.distplot(dists[0], hist=False, color="#7570b3", ax=ax)
#         sns.distplot(dists[1], hist=False, color="#7570b3", ax=ax)
#         sns.distplot(dists[2], hist=False, color="#7570b3", ax=ax)
# 
# 
#         #plt.ylim([-0.25,0.25])
#         lines = []
#         for i in range(3):
#             lines.append({
#                            "xs": [mu[i]-sigma[i]*3,mu[i]+sigma[i]*3],
#                            "ys":[-0.05-0.03*i,-0.05-0.03*i]
#                         })
#         print (lines)
#         for i in range(3):
#             plt.plot(lines[i]["xs"], lines[i]["ys"], 'k-', color="#1b9e77", lw=1)
#             ax.annotate(r'$\mathcal{N}_'+str(i+1)+'$', xy=(lines[i]["xs"][0]-1,lines[i]["ys"][0]), xytext=(lines[i]["xs"][0]-2,lines[i]["ys"][0]))
#         
# 
# 
#         rect1 = patches.Rectangle(
#             (0, -0.03),2, -0.03 , fill=False,
#             linewidth=None      # Default
#             )
#         ax.add_patch(rect1)
#         
#         rect2 = patches.Rectangle(
#             (10, -0.03),2, -0.1 , fill=False,
#             linewidth=None      # Default
#             )
#         ax.add_patch(rect2)
#         
#         rect3 = patches.Rectangle(
#             (18, -0.05),2, -0.1 , fill=False,
#             linewidth=None      # Default
#             )
#         ax.add_patch(rect3)
#         
#         plt.show()
#         if saveFile==True:
#             plt.savefig("/Users/halil/Downloads/"+filename, format="svg")
#         sns.distplot(samples)
#         plt.show()
#         
    

mu = 5
sigma = 2
mmp = OneDimDensityPlot()
mmp.start(mu,sigma,"gmmlines2.svg", saveFile=False)

    
        
