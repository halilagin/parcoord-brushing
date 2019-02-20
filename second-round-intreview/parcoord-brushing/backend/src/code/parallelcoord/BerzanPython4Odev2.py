'''

Write a Python program to construct the following pattern, using a nested for loop.
i j

1 5 * * * * *  6-1 =5
2 4 * * * *    6-2 =4
3 3 * * *     6-3 =3
4 2 * *       6-4 =2
5 1 *         6-5 =1

'''


liste = list(range(1,6,1))

for i in liste:
        print ( "* " * (6-i))