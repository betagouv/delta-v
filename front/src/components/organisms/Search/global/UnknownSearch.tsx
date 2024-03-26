import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/molecules/Card';

export const UnknownSearch: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col" data-testid="empty-result-product-search-element">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary">
          Malheureusement nous n’avons pas d’informations en lien avec votre recherche.
        </Typography>
        <Typography color="secondary">
          Pour plus d’informations vous pouvez vous rapprocher de votre{' '}
          <Link
            href="https://www.douane.gouv.fr/service-en-ligne/annuaire-des-services-douaniers"
            external
            tag="span"
          >
            <span className="text-link">bureau de Douanes le plus proche</span>
          </Link>
          .
        </Typography>
      </div>
      <div className="mt-6">
        <Link href="tel:0800944040">
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
        </Link>
      </div>
    </div>
  );
};
