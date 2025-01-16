import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { Card } from '@/components/molecules/Card';

interface ProductNotManagedProps {
  addProduct: () => void;
}

export const ProductNotManaged: React.FC<ProductNotManagedProps> = ({
  addProduct,
}: ProductNotManagedProps) => {
  return (
    <div className="flex flex-col gap-6" data-testid="product-not-managed">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary" size="text-base">
          Malheureusement, ce produit ne peut pas être ajouté au calcul de la déclaration pour le
          moment.
        </Typography>
        <Typography color="secondary" size="text-base">
          Certains produits nécessitent un calcul de la part d’un Agent Douanier.
        </Typography>
        <Typography color="secondary" size="text-base">
          Nous vous proposons d’ajouter le produit à titre indicatif et de vous rapprocher d’un
          Agent pour le calcul définitif de vos droits.
        </Typography>
      </div>

      <div className=" flex w-full flex-col items-center">
        <div className="flex w-60 flex-col gap-4">
          <Button fullWidth onClick={addProduct}>
            Enregistrer la marchandise
          </Button>
        </div>
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
