
# finding the count of even numbers between 0 and 100.

#x=10%2
#print("x",x)
#y=7%2
#print("y",y)

#onemli not:  space and tab are important in python!!!!

nums = [0,1,2,3,4,5,6,7,8,9,10]
count=0



for item in nums:
    print("ev even a yan na:", item)
    if item%2==0: # heger cift sayi ye yan na!
        #bele cift sayi ya!
        print("bele even a:", item)
        count=count+1 # yek zede bike! mana wina ew e ku tu dijmeri.
        print ("count:",count)
    else:
        print ("na ne even a, count zede neke! count=",count)



    



