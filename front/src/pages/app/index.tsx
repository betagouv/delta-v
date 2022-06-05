import { Card } from '@/components/common/Card';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { Input } from '@/components/input/StandardInputs/Input';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Déclaration Douane"
          description="Déclaration Douane est un outil pour les particuliers qui permet de déclarer..."
        />
      }
    >
      <div className="flex flex-col gap-6 px-4 py-8">
        <div>
          <Typography weight="bold" variant="h1" tag="h1" color="secondary">
            Bonjour
          </Typography>
          <Typography weight="bold" variant="h1" tag="h1" color="primary">
            Bienvenue !
          </Typography>
        </div>

        <Input
          name="search"
          type="text"
          fullWidth
          placeholder="Que recherchez-vous ?"
          trailingIcon="search"
        ></Input>

        <div className="flex flex-col gap-4">
          <Card
            title="Préparer mon voyage"
            description="Les documents à prévoir avant votre voyage, les conseils..."
            svgName="luggages"
            rounded="lg"
            fullWidth
          />
          <Link to="/app/simulateur/configuration">
            <Card
              title="Simuler mes achats"
              description="Calculez les droits de douanes de vos achats en quelques clics"
              svgName="calculator"
              rounded="lg"
              fullWidth
            />
          </Link>

          <Link to="/app/faqs/">
            <Card
              title="FAQ"
              description="Une question ? Retrouvez toutes nos réponses ici"
              svgName="question"
              rounded="lg"
              fullWidth
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-primary-100 px-4 py-8">
        <Typography weight="bold" variant="h1" tag="h1" color="secondary">
          Pourquoi déclarer mes achats effectués à l’étranger ?
        </Typography>
        <Typography weight="normal" variant="body1" tag="p" color="secondary">
          Pour vous permettre d’être facilement en règle si vous avez acheté des produits à
          l’étranger et de vous assurer un passage rapide et fluide lors de votre retour en France.
        </Typography>
        <Link to="/test">
          <Typography weight="bold" variant="body1" tag="p">
            En savoir plus 🡢
          </Typography>
        </Link>
      </div>
      <div className="flex flex-col gap-6 px-4 py-8">
        <Typography weight="bold" variant="h1" tag="h1" color="secondary">
          Besoin d’aide ?
        </Typography>
        <div className="flex flex-row gap-6">
          <Card
            title="FAQ"
            variant="vertical"
            description="Une question ? Retrouvez toutes nos réponses ici"
            svgName="question"
            rounded="lg"
            fullWidth
          />
          <Card
            title="Mail"
            description="Vous pouvez nous poser votre question par mail"
            svgName="mail"
            rounded="lg"
            variant="vertical"
            fullWidth
          />
        </div>
        <Card
          title="Info Douane Service"
          subtitle="0 800 94 40 40"
          description={
            'Du lundi au vendredi, sauf jours fériés, de 8h30 à 18h.\nService et appel gratuits.'
          }
          svgName="phone"
          rounded="lg"
          variant="horizontal"
          fullWidth
        />
      </div>
    </Main>
  );
};

export default Index;
