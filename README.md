# PhilippeBusch_7_05012022

## Créez un réseau social d’entreprise

Ce projet comporte un front-end Angular et un backend Node/Express

---

## Guide de démarage

DEPENDANCES

- NodeJS 12.14 ou 14.0
- Serveur PostgreSQL

BASE POSTGRESQL

- Créer une base 'groupomania' et un utilisateur 'groupomania' avec tous les droits sur cette base.

via shell PostreSQL :

    postgres=# create database groupomania;
    postgres=# create user groupomania with encrypted password 'VotreMotDePassse';
    postgres=# grant all privileges on database groupomania to groupomania;

DEPOT GITHUB

- Cloner le dépôt :

https://github.com/pbusch/PhilippeBusch_7_05012022

BACKEND

- Variables d'environement (fichier .env à la racine de /backend/)

      PORT = port du serveur - par défaut : 3000

      APP_SECRET = chaine de cryptage à renseigner

      HOST = nom du serveur PostgreSQL - par défaut : localhost

      DB_USER = groupomania

      DB_PWD = Mot de Passe pour le user groupomania

- Créer un dossier /images à la racine de /backend/
- cd backend # Aller dans le dossier "backend"
- Lancer `npm install`
- Lancer `node server`

FRONTEND

- cd frontend # Aller dans le dossier "frontend"
- Lancer `npm install`
- Lancer `ng serve`

DONNER LES DROITS ADMIN A UN UTILISATEUR QUE VOUS AVEZ CREE DEPUIS LE FRONTEND

Table 'users', passer le 'level' de l'utilisateur à '3' (= niveau 'admin')

via shell PostreSQL :

    postgres=#\c groupomania
    postgres=#UPDATE users SET level=’3’ WHERE ‘email’=”[mail de votre utilisateur]”

---

STATUT :
Terminé
