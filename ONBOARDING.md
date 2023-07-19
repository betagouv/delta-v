# Onboarding tech

## Mise en place de l'environnement dev

### Démarrage

#### Créez votre fichier `.env.local.declareDouane` dans le dossier parent avec le contenu suivant

```env
DB_HOST='database-delta-v'
DB_USERNAME='postgres'
DB_PASSWORD='pass'
DB_DATABASE='postgres'
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
