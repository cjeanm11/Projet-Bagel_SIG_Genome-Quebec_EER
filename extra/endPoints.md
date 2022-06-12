---
title: {{ site.title }}
lang: en
description: {{ site.description }} 
---

## End points :



#### GET requests:

- \users (all info users) 
- \users\pending (all users that don't yet access to the app)

- \users\students (all info students)
- \users\students\pending (all students that don't yet access to the app)

- \users\teachers (all info teachers)

- \users\admins (all info admins)

- \users\{id:string} (specific user) 

- \map (info map)

- \map\markers (info seulement des les markeurs)

- \map\markers\globalData (recuperer les donnees)	


Retourne toute un body qui comprendre un Object json ou une liste d'objet json.

#### POST requests :

- \map\markers (add maker) request body: ObjectJSON
- \users (create user) request body: OBjectJSON

retourne un code (404,200,500...)

#### PUT requests :

- \users\\{id:string}  (changer le status) request body: ObjectJSON

- \map\markers\\{id:string} (changer une information) request body: ObjectJSON


#### Securité: (Avant la mise en prod)
- Ajouter https pour bloquer l'interception d'information qu'on pourrait récupérer d'une requete.