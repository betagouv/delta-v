import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';

interface ProductNotManagedProps {
  currentProduct: Product;
}

export const ProductNotManaged: React.FC<ProductNotManagedProps> = ({
  currentProduct,
}: ProductNotManagedProps) => {
  return (
    <div className="flex flex-col gap-6" data-testid="product-not-managed">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary" size="text-lg">
          Malheureusement, ce produit ne peut pas être ajouté au calcul de la déclaration pour le
          moment.
        </Typography>
        <Typography color="secondary" size="text-lg">
          Certains produit nécessite un calcul de la part d’un Agent Douanier.
        </Typography>
        <Typography color="secondary" size="text-lg">
          Nous vous proposons d’ajouter le produit à titre indicatif et de vous rapprocher d’un
          Agent pour le calcul définitif de vos droits.
        </Typography>
      </div>

      <div className=" flex w-full flex-col items-center">
        <div className="flex w-60 flex-col gap-4">
          <Link to={`/simulateur/produits/${currentProduct.id}?allowNotManagedProduct=true`}>
            <Button fullWidth>Enregistrer la marchandise</Button>
          </Link>
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
