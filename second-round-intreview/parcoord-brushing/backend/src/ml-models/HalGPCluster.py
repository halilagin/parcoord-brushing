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



xs = np.linspace(-1,1,200)

ys = np.sqrt(1-xs**2)
x = np.array([np.concatenate((xs,xs),axis=0),np.concatenate((ys,-1*ys),axis=0)]).T
print (x[:,0])
plt.plot(x[:,0],x[:,1])
plt.show()
