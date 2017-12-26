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

class PlotMVN(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''

    def start(self):
        pass
        #setup_text_plots(fontsize=8)
        mean = np.array([1, 1])
        sigma_1 = 2
        sigma_2 = 1
        alpha = np.pi / 4
        
        np.random.seed(0)
        x, cov = bivariate_normal(mean, sigma_1, sigma_2, alpha, size=100000,
                          return_cov=True)

        sigma_x = np.sqrt(cov[0, 0])
        sigma_y = np.sqrt(cov[1, 1])
        sigma_xy = cov[0, 1]
        
        
        fig = plt.figure(figsize=(5, 5))
        ax = fig.add_subplot(111)

        # plot a 2D histogram/hess diagram of the points
        H, bins = np.histogramdd(x, bins=2 * [np.linspace(-4, 4, 51)])
#         ax.imshow(H, origin='lower',  interpolation='nearest',
#           extent=[bins[0][0], bins[0][-1], bins[1][0], bins[1][-1]])

        # draw 1, 2, 3-sigma ellipses over the distribution
        for N in ([3]):
            ax.add_patch(Ellipse(mean, N * sigma_1, N * sigma_2,
                         angle=alpha * 180. / np.pi, lw=1,
                         ec='k', fc='none'))


        ax.set_xlabel('x')
        ax.set_ylabel('y')
        ax.set_xlim((-6,6))
        ax.set_ylim((-6,6))
        
                
        plt.axhline(y=-3)
        plt.axvline(x=-3)

        
        plt.show()

plot_= PlotMVN()
plot_.start()