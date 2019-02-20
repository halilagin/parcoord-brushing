'''

Write a Python program to construct the following pattern, using a nested for loop.
i j
9 (1..5) 2
********* 1 9  9-2*(i-1)
 *******  2 7  9-2*(i-1)
  *****   3 5  9-2*(i-1)
   ***    4 3  9-2*(i-1)
    *     5 1  9-2*(i-1)
'''

 
liste = list(range(1,6,1))  #1,2,3,4,5
 
for i in liste:
        print ()
        print (" " * (i-1) + "*" * (9-2*(i-1)) )

