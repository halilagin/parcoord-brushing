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
import matplotlib.lines as lines
import matplotlib.patches as patches
class IndexComparePlot(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''



    def pca(self, mu, cov,savefig):
        pass
        np.random.seed(0)
        size= 40
        colors1 = np.repeat('black',36)
        colors2 = np.repeat('red',4)
        colors = np.append(colors1,colors2)
        x, y = np.random.multivariate_normal(mu, cov, 36).T
        x_ = np.arange(5,5.8,0.2)
        y_ = np.arange(10,10.2,0.05)
        x = np.append(x,x_)
        y = np.append(y,y_)
        print (x)
        
        fig, ax = plt.subplots()

        
        markers2 = ["x","+",".","s","v"]
        ax.scatter(x[:36], y[:36], color=colors,marker='.')
        
        for i in range(4):
            print ([x[36+i]], [y[36+i]])
            ax.scatter([x[36+i]], [y[36+i]], color=colors[36+i],marker='.')
        
        
        dashes = [2, 1, 2, 1]  # 10 points on, 5 off, 100 on, 5 off
        indexes = [13,17,6,8]
        for i in range(len(indexes)):
            ax.annotate(r'$x_{'+str(indexes[i])+'}$', xy=(x[36+i]-0.04, 9.5-0.2), xytext=(x[36+i]-0.04, 9.5-0.2), color="red", fontsize=9)
            line1, = ax.plot([x[36+i],x[36+i]], [y[36+i]-0.06,9.5], '--', linewidth=1, color='black')
            line1.set_dashes(dashes)

        rect1 = patches.Rectangle(
            (4.8, 9.8),1.0, 0.7 , fill=True, alpha=0.3,  facecolor="#fdbb84",
            linewidth=None      # Default
            )
        ax.add_patch(rect1)
        
        if savefig==True:
            plt.savefig("/Users/halil/Downloads/psbinpc_indexing_pca.svg", format="svg")
        else:
            plt.show()
        
    def samplespace(self, mu, cov,savefig):
        pass
        np.random.seed(45)
        size= 40
        colors1 = np.repeat('black',36)
        colors2 = np.repeat('red',4)
        colors = np.append(colors1,colors2)
        x, y = np.random.multivariate_normal(mu, cov, 40).T
        
        fig, ax = plt.subplots()

        
        ax.scatter(x, y, color=colors,marker='.')
        
        indexes = [13,17,6,8]
        for i in range(len(indexes)):
            print (indexes[i], 36+i)
            ax.annotate(r'$x_{'+str(indexes[i])+'}$', xy=(x[36+i], y[36+i]), xytext=(x[36+i], y[36+i]), color="red")
        
        
        if savefig==True:
            plt.savefig("/Users/halil/Downloads/psbinpc_indexing_samplespace.svg", format="svg")
        else:
            plt.show()
        
        
    def eqIndexical(self,savefig):
        fig, ax = plt.subplots()
        ax.set_xlim((0,10))
        ax.set_ylim((0,10))
        ax.annotate(r'$I_{SS}=I_{PS}$', xy=(5,5), xytext=(5,5), color="red")
        ax.annotate(r'$=[13,17,6,8]$', xy=(5.30,4.5), xytext=(5.30,4.5), color="red")
        if savefig==True:
            plt.savefig("/Users/halil/Downloads/psbinpc_indexing_eqindexical.svg", format="svg")
        else:
            plt.show()        
    def eqNonIndexical(self,savefig):
        fig, ax = plt.subplots()
        ax.set_xlim((0,10))
        ax.set_ylim((0,10))
        ax.annotate(r'$\theta_1=(\mu_1,\Sigma_1)$', xy=(5,5), xytext=(5,5), color="red")
        ax.annotate(r'$\Theta=\{\theta_i\}_{i=1}^n$', xy=(4.95,4.3), xytext=(4.95,4.3), color="red")
        ax.annotate(r'$i \in I_{SS},\,\, s.t.\,\, \phi^{-1}(\theta_i) \leq i \leq \phi^{-1}(\theta_j)$', xy=(5,3.6), xytext=(5,3.6), color="red")
        #ax.annotate(r'$=[13,17,6,8]$', xy=(5.30,4.5), xytext=(5.30,4.5), color="red")
        if savefig==True:
            plt.savefig("/Users/halil/Downloads/psbinpc_indexing_eqnonindexical.svg", format="svg")
        else:
            plt.show()
        
        
    def start(self, savefig=False):
        mu = [5, 12]
        cov = [[1, 0.7], [0.7, 1]] 
        self.pca(mu,cov,savefig)
        mu = [3, 3]
        cov = [[1, 0.8], [0.8, 1]] 
        self.samplespace(mu,cov,savefig)

        self.eqIndexical(savefig)
        self.eqNonIndexical(savefig)
        

# 
plot_= IndexComparePlot()
plot_.start(savefig=True)


