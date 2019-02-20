import sys

'''

Write a Python program to construct the following pattern, using a nested for loop.

* 
* * 
* * * 
* * * * 
* * * * * 
* * * * * * 
* * * * * * *
* * * * * * * *






Her rezewide kasi hejmara we reze star hene.

Her satirinda satir numarasi kadar yildiz olan sey.

'''




liste=list(range(1,9))

for satir in liste:
    for i in range(satir): 
        sys.stdout.write("* ")
    print("")

    

    



