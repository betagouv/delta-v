# delta-v

Projet Delta V (Déclare Douane) - Déclarer des marchandises achetées à l'étranger en arrivant en France

[En savoir plus](https://beta.gouv.fr/startups/delta.v.html)

## Aspects techniques

Si vous voulez installer l'environnement en local : [ONBOARDING.md](./ONBOARDING.md)

### Architecture

**Le Back-End**

- Langage : [Typescript](https://www.typescriptlang.org/)
- Framework : [Node.js](https://nodejs.org/fr/) avec [Express](https://expressjs.com/fr/)

Il permet principalement de fournir une API REST pour les clients.

**Le Front-End**

- Langage : [Typescript](https://www.typescriptlang.org/)
- Framework : [React](https://fr.reactjs.org/) avec [Next.js](https://nextjs.org/)

Il s'agit d'une interface web pour les clients.

**La partie Admin**

- Framework : [Directus](https://directus.io/)

Il s'agit d'une interface web permettant à l'administration compétente de modifier les données qui vont être affichées sur les différents clients.

**La base de données**

- [PostgreSql](https://www.postgresql.org/)

**Un cache Redis**

- [Redis](https://redis.io/)

### Infrastructure

Pour l'infrastructure, nous utilisons [Clever Cloud](https://clever-cloud.com/fr/) pour :

- L'instance Back-End, Front-End et Admin
- La base de données PostgreSql
- Le stockage des fichiers statiques
- Le cache Redis

Nous disposons de 2 environnements :

- [staging](https://stage.declare-douane.beta.gouv.fr/) : il s'agit d'une version de production, mais avec des données en sandbox.
- [prod](https://declare-douane.beta.gouv.fr) : pour la production

### Outillage

- [Github](https://github.com/) pour l'hébergement du code et l'intégration continue
- [Sentry](https://sentry.io) pour le reporting des erreurs
