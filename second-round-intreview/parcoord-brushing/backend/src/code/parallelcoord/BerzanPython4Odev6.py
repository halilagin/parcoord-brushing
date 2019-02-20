'''
bir listenin diger listenin alt kumesi olup olmadigini goster.
'''

liste1=[3,5,6,0]
liste2=[3,5,6,87,9]


'''

kucuk listeyi bul (ornek L1)

ayni=True
L1 deki her bir eleman icin:
o eleman L2'de mi
hayirsa  ayni=False

'''


len1 = len(liste1)
len2 = len(liste2)



kucukliste=[]
buyukliste=[]

if (len(liste1)<=len(liste2)):
    kucukliste=liste1
    buyukliste=liste2
else:
    kucukliste=liste2
    buyukliste=liste1
    
altkumesimi=True
for idx, kucukeleman in enumerate(kucukliste):
    
    icindemi=False
    for buyukeleman in buyukliste:
        if kucukeleman==buyukeleman:
            icindemi=True
            break
    
    if icindemi==False:# kucuk listenin bir elemani buyuk listenin icinde degilse
        altkumesimi=False # altkumesi degildir!
        break



if altkumesimi==True:
    print("alt kumesidir")
else:
    print("alt kumesi degildir")


'''
bu kismi tamamlayin
'''