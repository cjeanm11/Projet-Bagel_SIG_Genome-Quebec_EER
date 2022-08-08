---
lang: fr
---

## Tâches:

- Concevoir et modéliser la base de données
- Développer le backend et le traitement de requêtes
- Implanter l'authentification d'usagers avec validation et encryption des mots de passes
- Gérer les différents modes d'accès correspondants aux rôles d'usagers
- Développer le panneau d'administration
- Performer les tests avec différents cas d'utilisation

## Rapport:

### 19 Mai - 15 Juin 2022

Durant ce mois, plusieurs concepts ont été discutés lors des réunions avec l'École En Réseau et Génome Québec tel que l'utilisabilité et les fonctionnalités de l'application pour cerner l'ampleur et les besoins du projet.

Ont suivi des réunions avec l'équipe de développement du DIRO afin de discuter les technologies qui pourraient être utilisées pour le développement de l'application. Il a été décidé d'utiliser React pour implanter l'interface utilisateur. J'ai donc suggéré d'utiliser le [MERN Stack](https://www.mongodb.com/mern-stack) qui fournit tous les outils nécessaires à l'élaboration du projet utilisant un seul langage de programmation: JavaScript.

- [MongoDB](https://www.mongodb.com/) : Base de données NoSQL
- [Express](https://expressjs.com/) : Librairie JS côté serveur
- [React](https://reactjs.org/) : Librairie JS côté client
- [Node.js](https://nodejs.org/) : Serveur Web pour JavaScript

![MERN stack](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

### 16 Juin - 10 Juillet

Durant cette période, on a convenu qu'on allait utiliser l'architecture [MVC](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur) (Modèle-vue-contrôleur) et décidé du modèle de données dont on allait avoir besoin. Suite à quoi, j'ai:

- Créé un compte et une base de données MongoDB
- Conçu individuellement le [modèle de données](/projet-IFT3150/extra/diagramme.html) et créé les collections correspondantes

![ER diagram](/projet-IFT3150/extra/diagramme.png)

- Implanté les champs correspondant au modèle de données avec l'interface Mongoose en tenant compte de leur types et contraintes
- Développé et tester le traitement des requêtes pour les endpoint spécifiques à l'inscription et l'identification des usagers
- Traité la validation et les différents cas d'utilisation de l'authentification

## 11 Juillet - 6 Août 2022

Pendant cette période, j'ai:

- Développé la gestion des requêtes dans le backend pour performer les opérations [CRUD](https://fr.wikipedia.org/wiki/CRUD) sur les usagers et les markers
- Implanté le contexte d'authentification et mis à jour l'état correspondant au plus haut niveau de l'application pour stocker les données de l'usager identifié dans le storage du navigateur
- Implanté l'envoi de requêtes par les formulaires d'authentification et adapté quelques composantes à ce contexte
- Restructurer le code pour l'intégrer à l'architecture MVC
