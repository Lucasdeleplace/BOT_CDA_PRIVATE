# Bot Discord CDA

Bot Discord pour la promotion CDA, permettant de gérer les rappels de signature et autres fonctionnalités.

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :

```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
DISCORD_TOKEN=votre_token_ici
CLIENT_ID=votre_client_id_ici
GUILD_ID=votre_guild_id_ici
```

## Démarrage

Pour démarrer le bot en mode développement :

```bash
npm run dev
```

Pour démarrer le bot en production :

```bash
npm start
```

## Commandes disponibles

- `!ping` : Teste si le bot est en ligne

## Structure du projet

```
bot-cda-discord/
├── src/
│   ├── commands/     # Commandes du bot
│   └── index.js      # Point d'entrée
├── .env             # Variables d'environnement
├── .gitignore
├── package.json
└── README.md
```
