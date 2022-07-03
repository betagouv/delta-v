import { Search } from '@/components/business/search';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
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
      <div className="mb-8 flex flex-col gap-6">
        <div>
          <Typography
            weight="bold"
            variant="h1"
            tag="h1"
            size="text-3xl"
            color="secondary"
            lineHeight="leading-none"
          >
            Bonjour
          </Typography>
          <Typography
            weight="bold"
            variant="h1"
            tag="h1"
            size="text-3xl"
            color="primary"
            lineHeight="leading-none"
          >
            Bienvenue !
          </Typography>
        </div>

        <Search onSearch={() => []} withSearchIcon searchType="faq" />

        <div className="flex flex-col gap-4">
          <Card
            title="Préparer mon voyage"
            description="Les documents à prévoir avant votre voyage, les conseils..."
            svgName="luggages"
            rounded="lg"
            fullWidth
          />

          <Link to="/simulateur">
            <Card
              title="Simuler mes achats"
              description="Calculez les droits de douanes de vos achats en quelques clics"
              svgName="calculator"
              rounded="lg"
              fullWidth
            />
          </Link>

          <Link to="/faqs/">
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
      <div className="-mx-4 flex flex-col gap-6 bg-primary-100 px-4 py-7">
        <Typography weight="bold" size="text-2xl" color="secondary">
          Pourquoi déclarer mes achats effectués à l’étranger ?
        </Typography>
        <Typography
          weight="normal"
          variant="body1"
          tag="p"
          color="secondary"
          lineHeight="leading-4"
        >
          Pour vous permettre d’être facilement en règle si vous avez acheté des produits à
          l’étranger et de vous assurer un passage rapide et fluide lors de votre retour en France.
        </Typography>
        <Link to="/test">
          <div className="flex flex-row items-center">
            <Typography weight="bold" variant="body1" tag="p" color="link">
              <div className="flex flex-row">
                En savoir plus
                <div className="ml-1 h-3.5 w-3.5">
                  <Icon name="arrow-right" />
                </div>
              </div>
            </Typography>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-6 py-7">
        <Typography weight="bold" size="text-2xl" color="secondary">
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
            'Du lundi au vendredi, sauf jours \nfériés, de 8h30 à 18h.\nService et appel gratuits.'
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
