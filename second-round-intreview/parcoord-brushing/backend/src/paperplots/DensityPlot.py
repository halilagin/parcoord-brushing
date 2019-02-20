'''
Created on Dec 3, 2017

@author: halil
'''
from code.parallelcoord import ParCoordDataProvider
from paperplots.MultiModePlot import MultiModePlot


'''
see: http://www.astroml.org/book_figures/chapter3/fig_bivariate_gaussian.html

'''

import numpy as np
from matplotlib import pyplot as plt
from matplotlib.patches import Ellipse

from code.parallelcoord.ParCoordDataProvider import IrisDataProvider
import seaborn as sns
from matplotlib.backends.backend_pdf import PdfPages
from sklearn.mixture import GaussianMixture


class DensityPlot(object):
    '''
    classdocs
    '''


    def __init__(self):
        '''
        Constructor
        '''
        
        
    def testDensityPlotSepallen(self):
        pass
                
        iris = IrisDataProvider()
        sepal_len = iris.df[['sepal_len']].values.ravel()
        print (sepal_len)

        fig, ax = plt.subplots()
 
         
        sns.distplot(sepal_len, hist=False, color="#d95f02", ax=ax)
        plt.xlabel("sepal_len")
        plt.ylabel("Density")
        

        #plt.ylim([-0.25,0.25])
        plt.show()

    
    def testEMSepalLen(self):
        gmm = GaussianMixture(n_components=3)
        iris = IrisDataProvider()
        sepal_len = iris.df[['sepal_len']].values
        gmm.fit(sepal_len)
        
        gmm_ = np.array([gmm.means_.ravel().tolist(), gmm.covariances_.ravel().tolist()]).T
        gmm_ = sorted(gmm_, key=lambda a_entry: a_entry[0]) 
        gmm_ = np.array(gmm_)
        
        means = gmm_[:,0].tolist()
        sigmas = gmm_[:,1].tolist()
        
        gmms = {"means":means,
          "sigmas":sigmas
          } 
        print ("testEMSepalLen.gmms:",gmms)

        mmp = MultiModePlot()
        mmp.start(gmms["means"], gmms["sigmas"],"gmmlines2.svg", saveFile=False)
        
    def testEMPetalW(self):
        gmm = GaussianMixture(n_components=3)
        iris = IrisDataProvider()
        sepal_len = iris.df[['petal_w']].values
        gmm.fit(sepal_len)
        
        gmm_ = np.array([gmm.means_.ravel().tolist(), gmm.covariances_.ravel().tolist()]).T
        gmm_ = sorted(gmm_, key=lambda a_entry: a_entry[0]) 
        gmm_ = np.array(gmm_)
        
        means = gmm_[:,0].tolist()
        sigmas = gmm_[:,1].tolist()
        
        gmms = {"means":means,
          "sigmas":sigmas
          } 
        print ("testEMSepalLen.gmms:",gmms)

        mmp = MultiModePlot()
        mmp.start(gmms["means"], gmms["sigmas"],"gmmlines2.svg", saveFile=False)
        
    def start(self):
        pass
                
        iris = IrisDataProvider()
        petallen = iris.df[['petal_len']].values.ravel()
        print (petallen)

        fig, ax = plt.subplots()
 
         
        sns.distplot(petallen, hist=False, color="#d95f02", ax=ax)
        plt.xlabel("Petal Length")
        plt.ylabel("Density")
        
        pp = PdfPages('/Users/halil/Yandex.Disk.localized/root/academic/myphd/phd/0070-coding/parcoord-brushing/frontend/public/paperplots/petallen_densplot.pdf')

        plt.savefig(pp, format='pdf')
        pp.close()

        #plt.ylim([-0.25,0.25])
        plt.show()


#DensityPlot().start()
#DensityPlot().testDensityPlotSepallen()  
#DensityPlot().testEMSepalLen()
#DensityPlot().testEMPetalW()
