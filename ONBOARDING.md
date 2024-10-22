# Onboarding tech

## Mise en place de l'environnement dev

### Démarrage

#### Créez votre fichier `.env.local.declareDouane` dans le dossier parent avec le contenu suivant

```env
DB_HOST='database-delta-v'
DB_USERNAME='postgres'
DB_PASSWORD='pass'
DB_DATABASE='postgres'
ACCESS_TOKEN_SECRET='accessTokenSecretLocalDev'
REFRESH_TOKEN_SECRET='refreshTokenSecretLocalDev'
VALIDATION_TOKEN_SECRET='validationTokenSecretLocalDev'
RESET_PASSWORD_TOKEN_SECRET='resetPasswordTokenSecretLocalDev'

AGENTCONNECT_ISSUER=https://fca.integ01.dev-agentconnect.fr/api/v2
AGENTCONNECT_CLIENT_ID='ID_A_DEMANDER_AU_RESPONSABLE_DU_PROJET'
AGENTCONNECT_CLIENT_SECRET='SECRET_A_DEMANDER_AU_RESPONSABLE_DU_PROJET'
```

```
# Cloner le repo
git clone git@github.com:betagouv/delta-v.git

# Installer le projet
make init

# démarer le projet
make start
```

### Tests

#### Vérification syntaxique :

Pour le backend :

```sh
make lint-back
```

Pour le frontend :

```sh
make lint-front
```

#### Tests unitaires

pour le backend :

```sh
make test-back
```

pour le frontend :

```sh
make test-front
```
