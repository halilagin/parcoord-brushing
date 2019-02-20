'''
Iki listenin ayni olup olmadigini gosteren bir program yaz
'''

liste1=[3,5,6,87,9]
liste2=[3,5,6,87,9]


ayni=True
for idx, v in enumerate(liste1):
    if liste1[idx]!=liste2[idx]:
        ayni=False
        break
    
if ayni:
    print ("bu listeler aynidir")
else:
    print ("bu listeler farklidir")