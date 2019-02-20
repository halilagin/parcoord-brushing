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
from scipy.stats import multivariate_normal

class MultivariateNormalPlot(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        
    def genData(self):
        mean=[0,0]
        cov=[[1,0.8],[0.8,1]]
        x, y = np.random.multivariate_normal(mean, cov, 200).T
        return x, y
        #return np.vstack((x,y)).T
        
        
    ## show multivariate data set
    def test01(self):
        x,y = self.genData()
        plt.plot(x, y, '.')
        plt.axis('equal')
        plt.show()
        print (data)
        
    
    def test02(self):
        pass
        x,y = self.genData()
        
        xmin = x.min()
        xmax = x.max()
        ymin = y.min()
        ymax = y.max()
        extent = [xmin, xmax, ymin, ymax]
        X, Y = np.mgrid[xmin:xmax:100j, ymin:ymax:100j]
        positions = np.vstack([X.ravel(), Y.ravel()])
        values = np.vstack([x,y])
        kernel = stats.gaussian_kde(values)
        probs = kernel.pdf(positions).T
        
        kernel.resample(200)
        Z = np.reshape(probs, X.shape)
        
        def showProb(z_, extent_):
            fig, ax = plt.subplots()
            ax.imshow(np.rot90(z_), cmap=plt.cm.gist_earth_r,
              extent=extent_)
            plt.show()
        
        showProb(Z, extent)
        print (sum(kernel.pdf(positions)))
        print(sum(probs))

        #print(kernel)
    
    ## generate high cluttered data set, reduce the density and compare the descriptive stats between original one and reduced one.
    def test03(self):
        pass
   
    def start(self):
        pass
        self.test01()
        

np.random.seed(2018)
mmp = MultivariateNormalPlot()
mmp.start()

    
        
