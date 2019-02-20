"""
Inferring a binomial proportion via exact mathematical analysis.
"""
import sys
import numpy as np
from scipy.stats import beta
from scipy.special import beta as beta_func
import matplotlib.pyplot as plt
import matplotlib.patches as patches
#from HDIofICDF import *
from scipy.optimize import fmin
#from scipy.stats import *
from scipy.stats import beta
from scipy import special
from scipy import stats
import random
from scipy.special.basic import bernoulli
import math
from pylab import mlab
import json
from builtins import staticmethod
import copy
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, ConstantKernel as C
import timeit





class KernelExponential(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        exponential = self.thetas[0] * np.exp( -0.5 * self.thetas[1] * np.sum( (x - y)**2 ) )
        return exponential


class KernelLinear(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        return x*y
 
 
class KernelBrownianMoiton(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        return min(x,y)

class KernelOrnstein(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        exponential =  np.exp( -1 *  math.sqrt((x - y)**2 ) )
        return exponential   
    
class KernelPeriodic(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        exponential =  np.exp( -1 *  math.sin(5 * math.pi * (x - y))**2  )
        return exponential   

class KernelSymmetric(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        exponential =  np.exp( -100 *min(abs(x - y), abs(x+y) )**2 )
        return exponential  
    

class KernelCircular(object):
    """
    Kernel from Bishop's Pattern Recognition and Machine Learning pg. 307 Eqn. 6.63.
    """
    def __init__(self,*args):
        self.thetas = args

    def __call__(self,x,y):
        if x<=y:
            return math.sqrt(25-x**2) 
        else:
            return math.sqrt(25-x**2) 
        return exponential

class GaussianProcessSampling(object):


    def covariance(self, kernel, data):
        return np.reshape([kernel(x,y) for x in data for y in data], (len(data),len(data)))
    
    def GPPrior(self, C):
        
        ndim = C.shape[0]
        #z = np.random.standard_normal(ndim)
        
        # Better numerical stability than cholskey decomposition for
        # near-singular matrices C.
        [U,S,V] = np.linalg.svd(C)
        A = U * np.sqrt(S)
        return A + 1e-6*np.eye(ndim)

    
    def start(self):
        
        np.random.seed(2017)
        #kernel = OrnsteinKernel(1.0)
        kernel = None
        
        kernelNo=1
        if kernelNo==1:
            kernel = KernelExponential(1.0, 64.0, 0.0, 0.0)
        elif kernelNo==2:
            kernel = KernelLinear()
        elif kernelNo==3:
            kernel = KernelBrownianMoiton()
        elif kernelNo==4:
            kernel = KernelOrnstein()
        elif kernelNo==5:
            kernel = KernelPeriodic()
        elif kernelNo==6:
            kernel = KernelSymmetric()
        elif kernelNo==7:
            kernel = KernelCircular()

            
        
        n = 100
        Xtest = np.linspace(-1,1,n).reshape(-1,1)
        
        C = self.covariance(kernel, Xtest)
        gp_prior = self.GPPrior(C)
        
        f_prior = np.dot(gp_prior, np.random.normal(size=(n, 10)))
        print (np.sum(gp_prior))
        plt.figure()
        plt.plot(Xtest, f_prior)
        plt.show()


#run        
GaussianProcessSampling().start()
