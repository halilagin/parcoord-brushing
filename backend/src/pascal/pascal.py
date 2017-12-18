'''
Created on Dec 7, 2017

@author: halil
'''

import numpy as np
import matplotlib.pyplot as plt
from numpy import ones,vstack
from numpy.linalg import lstsq

class MyPascal(object):
    '''
    classdocs
    '''


    def __init__(self, params):
        '''
        Constructor
        '''
        
    ## see: https://stackoverflow.com/questions/21565994/method-to-return-the-equation-of-a-straight-line-given-two-points
    ## see: https://docs.scipy.org/doc/numpy-1.13.0/reference/generated/numpy.linalg.solve.html
    def linequ(self, points):
        #points = [(1,5),(3,4)]
        x_coords, y_coords = zip(*points)
        A = vstack([x_coords,ones(len(x_coords))]).T
        m, c = lstsq(A, y_coords)[0]
        return [m,c]
        #print("Line Solution is y = {m}x + {c}".format(m=m,c=c))
    
    def solveLineIntersection(self, line_eq1,line_eq2):
        #line eqs are from linequ function: y = mx+c
        #linalg.solve takes lines a1x1+b1x2+c1=0, a2x1+b2x2+c2=0 --> a = np.array([[3,1], [1,2]])
        #b = np.array([9,8])
        #for eq 3 * x0 + x1 = 9 and x0 + 2 * x1 = 8:
         
        # mx+c-y=0-> m1x1-1*x2+c1=0
        # mx+c-y=0-> m2x1-1*x2+c2=0
        # a = [[m1,-1], [m2,-1]
        # b = [-c1,-c2]
        
        a = [line_eq1[0],-1],[line_eq2[0],-1]
        b = [-line_eq1[1],-line_eq2[1]]
        x = np.linalg.solve(a, b)
        return x
    
    def solveLineIntersectionGivenPoints(self, L1P1,L1P2, L2P1,L2P2):
        line_eq1 = self.linequ([L1P1,L1P2])
        line_eq2 = self.linequ([L2P1,L2P2])
        intersection_p = self.solveLineIntersection(line_eq1,line_eq2)
        #print (["{0:0.2f}".format(p) for p in intersection_p])
        return intersection_p
         
    
    def start(self):
        print("start")
        
        def sq(x):
            r = x**2
            
            return r
        
        
        def points(x):
            x_right = np.array(x)
            y_right = sq(x_right)
            return np.array([x_right, y_right])
            
        x = np.linspace(-1.0, 1.0, 1000)
        y = x**2
        #y = np.linspace(-1.0, 1.0, 1000)
        #F = X**2 + Y**2 - 0.6
        #/plt.contour(X,Y,F,[0])
        
        #right points
        A=[0.6, sq(0.6)]
        B=[0.65, sq(0.65)]
        C=[0.7, sq(0.7)]
        
        D=[-0.55, sq(0.55)]
        E=[-0.60, sq(0.60)]
        F=[-0.65, sq(0.65)]
        
        
        plt.plot([A[0],E[0]],[A[1],E[1]])
        plt.plot([A[0],F[0]],[A[1],F[1]])
        
        plt.plot([D[0],B[0]],[D[1],B[1]])
        plt.plot([D[0],C[0]],[D[1],C[1]])
        
        
        lineequ_ae = self.linequ([A,E])
        lineequ_bd = self.linequ([B,D])
        
        ip1 = self.solveLineIntersectionGivenPoints(A, E, B, D)
        ip2 = self.solveLineIntersectionGivenPoints(A, F, C, D)
        
        m,c = self.linequ([ip1,ip2]) # y = mx+c
        
        connectline = m*x+c
        
        plt.plot(x,connectline)
        
        plt.xlim([-1,1])
        plt.ylim([0,1])
        plt.plot(x,y)
        plt.scatter(ip1[0],ip1[1])
        plt.scatter(ip2[0],ip2[1])
        plt.show()

mp = MyPascal({})

mp.start()