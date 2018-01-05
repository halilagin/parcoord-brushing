'''
Created on Dec 3, 2017

@author: halil
'''
from code.parallelcoord import ParCoordDataProvider


'''
see: http://www.astroml.org/book_figures/chapter3/fig_bivariate_gaussian.html

'''

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse

from code.parallelcoord.ParCoordDataProvider import IrisDataProvider
import seaborn as sns
from matplotlib.backends.backend_pdf import PdfPages


class DensityPlot(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        

        
    def start(self):
        pass
                
        iris = IrisDataProvider()
        petallen = iris.df[['petal_len']].values.ravel()
        print (petallen)

        fig, ax = plt.subplots()
 
         
        sns.distplot(petallen, hist=False, color="#d95f02", ax=ax)
        plt.xlabel("Petal Length")
        plt.ylabel("Density")
        
        pp = PdfPages('/Users/halil/Downloads/petallen_densplot.pdf')

        plt.savefig(pp, format='pdf')
        pp.close()

        #plt.ylim([-0.25,0.25])
        plt.show()


DensityPlot().start()
   
