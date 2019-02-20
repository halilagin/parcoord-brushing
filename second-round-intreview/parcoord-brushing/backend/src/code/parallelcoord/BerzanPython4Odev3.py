'''

Write a Python program to construct the following pattern, using a nested for loop.
i j

1 16 * * * * * * * * * * * * * * * *    (5 u 1 -> 16)     2^(5-1)  -> 2^(5-i)
2 8 * * * * * * * *                     (5 u 2 -> 8)      2^(5-2)
3 4 * * * *                             (5 u 3 -> 4)      2^(5-3)
4 2 * *                                 (5 u 4 -> 2)      2^ (5-4)
5 1 *                                    (5 u 5 -> 1)     2^ (5-5))

'''

 
liste = list(range(1,6,1))
 
for i in liste:
        print ( "* " * (2**(5-i)) )

