## 🌄 Backend d'un mini blog en Node JS

## Table of Contents

1. [General Info](#general-info)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Documentation](#documentation)
5. [Collaboration](#collaboration)
6. [FAQs](#faqs)

## General Info

Le but de ce projet est de créer une mini plateforme de blog en Node JS et en Next JS.

Nous avons choisi de créer un projet de blog en Node JS pour pouvoir tester nos connaissances en Node JS.

Le projet se décompose en deux parties:

- **Backend**: ce qui est fait en Node JS.
- **Frontend**: ce qui est fait en Next JS.

Le backend est donc une API REST qui permet de gérer les données de notre blog.


---
## Prérequis

Vous devez avoir [Node JS](https://nodejs.org/en/) sur votre machine.

---
## Installation

📦 Il vous faut installer l'ensemble des dépendances avec `npm` en suivant la commande suivante :

```bash
npm install
```

---


### Configuration de l'application

#### Création du fichier `.env`

Vous pouvez copier le fichier `.env.example` et le renommer `.env` et remplacer les valeurs par défaut par vos propres valeurs.

> NB: Pensez à bien créer vos bases de données avant d'utiliser l'application.

### Pour lancer les migrations

```bash
npm run migrate
```

### Pour lancer les seeds (données de test)

```bash
npm run seed
```

### Pour vider la base de données et les migrations

```bash
npm run reset
```

> Vous pouvez aussi utiliser la concaténation pour lancer les migrations et les seeds en une seule commande :

```bash
npm run reset:migrate
npm run reset:migrate:seed
```

### ✅ Pour lancer le serveur

- En mode production

```bash
npm run start
```

- En mode développement

```bash
npm run dev
```

- Pour lancer les tests

```bash
npm run test
```

---

## Documentation

Pour consulter toute la documentation de l'API REST, il vous suffit de suivre le lien suivant : 
URL_API_REST + `/api-docs`.
Exemple : `http://localhost:4000/api-docs`


---

## Collaboration
😊😉
Si vous souhaitez contribuer à l'application, vous pouvez faire un fork sur [Github](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/fork) et commencer à développer.

---
## FAQs
💬 💭 Si vous avez des questions, vous pouvez les poser sur le [Github Issue](https://github.com/lazarefortune/SupDeVinci-Projet-Blog-Backend/issues) ou par mail à <lazarefortune@gmail.com>.
