import { Card } from '@/components/common/Card';
import { Typography } from '@/components/common/Typography';

export const UnknownProduct: React.FC = () => {
  return (
    <div className="flex flex-col gap-6" data-testid="empty-result-product-search-element">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary">
          Nous ne connaissons malheureusement pas ce produit.
        </Typography>
        <Typography color="secondary">
          Notre application s’améliore de jour en jour et la liste de produits s'enrichira
          prochainement.
        </Typography>
        <Typography color="secondary">
          Dans l’attente de retrouver ce produit ici, vous pouvez vous rapprocher d’agents des
          douanes pour le déclarer (en aéroport, port, gare ou à la frontière routière).
        </Typography>
      </div>

      <Card
        svgName="phone"
        title="Info Douane Service"
        subtitle="0 800 94 40 40"
        description={
          <>
            Du lundi au vendredi, sauf jours fériés, de 8h30 à 18h.
            <br />
            Service et appel gratuits.
          </>
        }
      />
    </div>
  );
};
