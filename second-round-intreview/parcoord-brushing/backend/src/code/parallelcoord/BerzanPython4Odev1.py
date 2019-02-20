'''

Write a Python program to construct the following pattern, using a nested for loop.
i j
1 1 * 
2 2 * * 
3 3 * * * 
4 4 * * * * 
5 5 * * * * * 
6 4 * * * *     j=6-i+4=4   
7 3 * * *       j=6-i+4=3
8 2 * *         j=6-i+4=2
9 1 *           j=6-i+4=1


bo hejmaren ji 6 kemtir
i=k -> j=k

bo hejmaren ji 6 u je zedetir
for i in range(6..9,1)
i= j=4
her resekide qasi hejmara we reze star hene .
'''


liste = list(range(1,10,1))

#print ( "*"*5 ) # qasi 5 heban star du hevdu bike.

for i in liste:
    if i<6:
        print ("* "*i)
    else:
        #k=6
        print ("* " * (6-i+4) )

  



