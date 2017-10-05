how to create a django app (namely modue)

1. python manage.py startapp parcoordapp (parcoordapp module created.)
2. create views and urls. you can copy them from other django apps (modules).
3. add apps class full path to the proghistdj/settings.py
4. do migrations. namely, sync things with your db. 
...4.1 python3.6 manage.py makemigrations parcoordapp
...4.2 python3.6 manage.py makemigrations parcoordapp 0001 (custom command in ide)
5. add thsi to proghostdj/urls.py :     url(r'^parcoord/',  include('parcoordapp.urls')),
6. add admin.site.register(ParCoordUserInteractionModel) into admin.py
7. done



get into shell if you need db updates

python3.6 manage.py shell

in shell:

from parcoordapp.models import ParCoordUserInteractionModel


ParCoordUserInteractionModel.objects.all()


run these below when you drop a table:

python3.6 manage.py migrate parcoordapp zero --fake
python3.6 manage.py migrate parcoordapp