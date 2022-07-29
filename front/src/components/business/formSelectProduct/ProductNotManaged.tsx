import { Card } from '@/components/common/Card';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';

export const ProductNotManaged: React.FC = () => {
  return (
    <div className="flex flex-col gap-6" data-testid="product-not-managed">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary">
          Malheureusement, ce produit ne peut pas être ajouté à la simulation pour le moment.
        </Typography>
        <Typography color="secondary">
          Notre application s’améliore de jour en jour et la liste des produits s’enrichira
          prochainement.
        </Typography>
        <Typography color="secondary">
          Dans l’attente de retrouver ce produit ici, vous pouvez vous rapprocher d’agents des
          douanes à votre arrivée en France pour le déclarer (en aéroport, port, gare ou à la
          frontière routière).
        </Typography>
      </div>

      <Link href="tel:0800944040">
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
      </Link>
    </div>
  );
};
