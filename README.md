## Backend d'un mini blog en Node JS

### Prérequis

Vous devez avoir [Node JS](https://nodejs.org/en/) sur votre machine.

### Installation des dépendances

```bash
npm install
```

### Configuration de l'application

#### Création du fichier `.env`

Vous pouvez copier le fichier `.env.example` et le renommer `.env` et remplacer les valeurs par défaut par vos propres valeurs.

### Pour lancer les migrations

```bash
npm run knex migrate:latest
```

### Pour lancer les seeds

```bash
npm run knex seed:run
```

### Pour lancer le serveur

```bash
npm run dev
```
