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

class CorrelatedPlots(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''

    def plot(self, mean, cov):
        pass
        x, y = np.random.multivariate_normal(mean, cov, 300).T
        plt.plot(x, y, '.')
        plt.axis('equal')
        plt.show()
        
    def toSVG(self):
        pass
        mean = [0, 0]
        cov = [[1, 0], [0, 1]]
        x, y = np.random.multivariate_normal(mean, cov, 300).T
        


svgp = CorrelatedPlots()
svgp.plot()


    
    
        
