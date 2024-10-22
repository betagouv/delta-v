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

**L'interface Admin**

- Framework : [Directus](https://directus.io/)

Il s'agit d'une interface web permettant à l'administration compétente de modifier les données qui vont être affichées sur les différents clients.

**La base de données**

- [PostgreSql](https://www.postgresql.org/)

**Un cache Redis**

- [Redis](https://redis.io/)

### Démarrage

consulter la [page d'onboarding](ONBOARDING.md)

### CI/CD

- Nous utilisons des [Github actions](https://github.com/features/actions) pour faire tourner les builds et
  tests.
- [Clever Cloud](https://clever-cloud.com/fr/) s'occupe de l’hébergement du site sur Internet.
- [OVH](https://www.ovhcloud.com/fr/) pour le dns.
