'''
Created on Dec 3, 2017

@author: halil
'''
from matplotlib.pyplot import xlabel


'''
see: http://www.astroml.org/book_figures/chapter3/fig_bivariate_gaussian.html

'''

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse

import seaborn as sns
from matplotlib.backends.backend_pdf import PdfPages
from sklearn.mixture import GaussianMixture
import math
import pandas as pd
class PsbPresentation(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        self.SIZE= 200
        self.noise = np.random.uniform(0,0.1,self.SIZE*2)
        xs_ = np.linspace(0,1,self.SIZE)
        ys_ = np.sqrt( 1-xs_**2)
        self.ys = np.concatenate((ys_,-ys_), axis=0)
        self.xs = np.concatenate((xs_,-xs_), axis=0)
        self.xs = self.xs+self.noise
        self.ys = self.ys+self.noise

        
    # a^2+b^2=1 as a circle and a = xy^2+m
    def test01(self):
        pass
         
        
        plt.scatter(self.xs,self.ys, marker='.', s=40)
        plt.show()

    def test02(self):
        pass
        fig, ax = plt.subplots() # note we must use plt.subplots, not plt.subplot

        plt.scatter(self.xs,self.ys, marker='.', s=40)
        plt.xlabel("$x$", fontsize=16)
        plt.ylabel("$y$", fontsize=16)
        
        plt.show()

    def test03(self):
        pass
        fig, ax = plt.subplots() # note we must use plt.subplots, not plt.subplot

        plt.scatter(self.xs,self.ys, marker='.', s=40)
        plt.xlabel("$x$", fontsize=16)
        plt.ylabel("$y$", fontsize=16)
        circle1 = plt.Circle((0.05, 0.05), 1, color='r', fill=False)
        ax.add_artist(circle1)
        
        plt.show()


    def test04(self):
        pass
        xs = np.square(self.xs)
        ys = np.square(self.ys) 
        
        data = {"xs":xs,"ys":ys}
        df = pd.DataFrame(data=data)
        #plt.scatter(xs, ys)
        ax = sns.lmplot(x="xs", y="ys", data=df, sharex=False, sharey=False,fit_reg=False);
        #ax.set(xlabel='$x^2$', ylabel='$y^2$')
        for ax in plt.gcf().axes:
            l = ax.get_xlabel()
            ax.set_xlabel("$x^2$", fontsize=16)
            ax.set_ylabel("$y^2$", fontsize=16)
        
        plt.xlim(-0.1, 1.3)
        plt.ylim(-0.1, 1.3)
        
        plt.show()
        
    def test05(self):
        pass
        xs = np.square(self.xs)
        ys = np.square(self.ys) 
        
        data = {"xs":xs,"ys":ys}
        df = pd.DataFrame(data=data)
        #plt.scatter(xs, ys)
        ax = sns.regplot(x="xs", y="ys", data=df, fit_reg=True, ci=None, line_kws={'color':'red'});
        #ax.set(xlabel='$x^2$', ylabel='$y^2$')
        for ax in plt.gcf().axes:
            l = ax.get_xlabel()
            ax.set_xlabel("$x^2$", fontsize=16)
            ax.set_ylabel("$y^2$", fontsize=16)

        plt.xlim(-0.1, 1.3)
        plt.ylim(-0.1, 1.3)
        
        plt.show()
        
    
    def start(self):
        pass
        #self.test01()        
        #self.test02()
        self.test03()
        self.test04()
        self.test05()

np.random.seed(2018)
PsbPresentation().start()
#DensityPlot().testDensityPlotSepallen()  
#DensityPlot().testEMSepalLen()
#DensityPlot().testEMPetalW()
