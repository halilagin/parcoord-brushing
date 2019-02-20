'''
Created on Dec 3, 2017

@author: halil
'''


'''
see: http://www.astroml.org/book_figures/chapter3/fig_bivariate_gaussian.html

'''
import sys
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
from scipy.optimize import curve_fit
from scipy.misc import factorial
from scipy.optimize import minimize
from scipy.stats import multivariate_normal




np.random.seed(2018)
pis = np.random.random(2)
pis /= pis.sum()
mus = np.random.random((2,2))
sigmas = np.array([np.eye(2)] * 2)
tol=0.01
max_iter = 1000
Mk=mus
Cov = sigmas

alpha=pis


#self.x, self.y = self.genData()

n = 100
_mus = np.array([[0,4], [-2,0]])
_sigmas = np.array([[[3, 0], [0, 0.5]], [[1,0],[0,2]]])
_pis = np.array([0.6, 0.4])
xs = np.concatenate([np.random.multivariate_normal(mu, sigma, int(pi*n))
                for pi, mu, sigma in zip(_pis, _mus, _sigmas)])      


    
## test numerical approximation close to analytical one
## show multivariate data set
def test01():
    print (xs[:,0])
    plt.plot(xs[:,0],xs[:,1], '.')
    plt.axis('equal')
    plt.show()
    
def em():
    pass
    global xs,alpha, Mk, Cov
    
    x= xs[:,0]
    y= xs[:,1]
       
    for i in range(max_iter):
        rikvalues = np.array([np.full(x.size,-1.0),np.full(x.size,-1.0)])
        rik = np.full(x.size, -1)
        
        # parameter sets of em consists of three parameters: alpha, mean and cov, 
        #alpha stores the proportional probability of each cluster
        # mean and cov are the params of gaussian of those clusters
        # Theta= {alpha_i, M_i, C_i}^m, there are m clusters and each cluster has alpha_i, M_i and C_i
        
        
        
        
        for ai,a in enumerate(alpha):
            for idx, r in enumerate(rik):
                #print (a,Mk[ai], Cov[ai],[x[idx],y[idx]])
                likelihood = multivariate_normal(Mk[ai], Cov[ai]).pdf([x[idx],y[idx]])
                #responsibilities assigned
                rikvalues[ai][idx] =  a * likelihood
            #print (rikvalues[ai])

           
        
        rikvalues /=rikvalues.sum(0)   
        
      
        #M-step
        
        alpha_new =  np.zeros(2)
        for i in range(2):
            for j in range(len(x)):
                alpha_new[i] +=rikvalues[i][j]
                
        alpha = alpha_new/len(x)
        
        
        
        mus = np.zeros(4).reshape(2,2)
        
        for mi, m in enumerate(mus):
            for i, xs in enumerate(x):
                mus[mi] += rikvalues[mi][i] * np.array([x[i],y[i]])
            mus[mi] /=rikvalues[mi,:].sum()
        Mk= mus
       
        
        sumcov=np.zeros(8).reshape(2,2,2)

        for mi, m in enumerate(mus):
            for xi,v in enumerate(x):
                YS = np.array([x[xi],y[xi]]) - Mk[mi]
                YS = YS.reshape(2,1)
                sumcov[mi] += rikvalues[mi][xi] * YS.dot(YS.T)
            sumcov[mi] /= rikvalues[mi,:].sum()    
       
        Cov=sumcov
               
            
            
        #print (rik)   
    return alpha, Mk, Cov
    
   
   
# approximate to gaussian distribution for the generated data set. 
def test02():
    alpha, Mk, Cov = em()
    print (alpha, Mk, Cov)





def em_gmm_orig(xs, pis, mus, sigmas, tol=0.01, max_iter=100):

    n, p = xs.shape
    k = len(pis)

    ll_old = 0
    for i in range(max_iter):
        ll_new = 0
        # E-step
        ws = np.zeros((k, n))
        for j in range(len(mus)):
            for i in range(n):
                ws[j, i] = pis[j] * multivariate_normal(mus[j], sigmas[j]).pdf(xs[i])
        
        

        ws /= ws.sum(0)
        # M-step
        pis = np.zeros(k)
        for j in range(len(mus)):
            for i in range(n):
                pis[j] += ws[j, i]
        pis /= n
        
       
        
        
        mus = np.zeros((k, p))
        for j in range(k):
            for i in range(n):
                mus[j] += ws[j, i] * xs[i]
            mus[j] /= ws[j, :].sum()

        
        
        sigmas = np.zeros((k, p, p))
        for j in range(k):
            for i in range(n):
                ys = np.reshape(xs[i]- mus[j], (2,1))
                sigmas[j] += ws[j, i] * np.dot(ys, ys.T)
            sigmas[j] /= ws[j,:].sum()
        
        print (sigmas)
        sys.exit(1)
        # update complete log likelihoood
        ll_new = 0.0
        for i in range(n):
            s = 0
            for j in range(k):
                s += pis[j] * multivariate_normal(mus[j], sigmas[j]).pdf(xs[i])
            ll_new += np.log(s)

        if np.abs(ll_new - ll_old) < tol:
            break
        ll_old = ll_new

    return ll_new, pis, mus, sigmas
    

def test03():
    pass
    
    em_gmm_orig(xs, pis, mus, sigmas, tol, max_iter)
    print (mus)
    
def start():
    pass
            
    #test01()
    test02()
    
    
    




start()

    
        
