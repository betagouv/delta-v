# Comment contribuer ?

Merci de prendre le temps de contribuer ! 🎉

Voici quelques informations pour démarrer :

## Rapport de bug, nouvelles fonctionnalités

Nous utilisons GitHub pour suivre tous les bugs et discussions sur les nouvelles fonctionnalités. Pour rapporter un bug ou proposer une évolution vous pouvez [ouvrir une nouvelle discussion](https://github.com/betagouv/delta-v/issues/new). N'hésitez pas à utiliser la recherche pour vérifier si le sujet n'est pas déjà traité dans une discussion ouverte.

## Développement

Si vous voulez participer au développement de nouvelles fonctionnalités, vous pouvez consulter la liste des «[good first issue](https://github.com/betagouv/delta-v/labels/%F0%9F%A5%87%20good%20first%20issue) ». Ce sont des fonctionnalités intéressantes qui ne sont normalement pas trop complexe à implémenter. N'hésitez pas à poser toutes vos questions sur ces issues !

### Technologies

**Le Back-End**

- Langage : [Typescript](https://www.typescriptlang.org/)
- Framework : [Node.js](https://nodejs.org/fr/) avec [Express](https://expressjs.com/fr/)

Il permet principalement de fournir une API REST pour les clients.

**Le Front-End**

- Langage : [Typescript](https://www.typescriptlang.org/)
- Framework : [React](https://fr.reactjs.org/) avec [Next.js](https://nextjs.org/)

Il s'agit d'une interface web pour les clients.

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

### CI/CD

- Nous utilisons des [Github actions](https://github.com/features/actions) pour faire tourner les builds et
  tests.
- [Clever Cloud](https://clever-cloud.com/fr/) s'occupe de l’hébergement du site sur Internet.
- [OVH](https://www.ovhcloud.com/fr/) pour le dns.
