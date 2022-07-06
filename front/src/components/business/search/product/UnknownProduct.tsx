import { Button } from '@/components/common/Button';
import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';

interface UnknownProductProps {
  searchValue: string;
}

export const UnknownProduct: React.FC<UnknownProductProps> = ({
  searchValue,
}: UnknownProductProps) => {
  return (
    <div className="flex h-full flex-col" data-testid="empty-result-product-search-element">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary">Cette marchandise n’est pas encore référencée.</Typography>
        <Typography color="secondary">
          Vous pouvez enregistrer vous même ce produit dans votre simulation ou annuler votre
          recherche.
        </Typography>
      </div>
      <div className="flex-1" />

      <div className=" flex w-full flex-col items-center">
        <div className="flex w-60 flex-col gap-4">
          <Link to={`/simulateur/produits/ajout?searchValue=${searchValue}`}>
            <Button fullWidth>Enregistrer la marchandise</Button>
          </Link>
          <Link to="/simulateur/produits">
            <Button fullWidth variant="outlined">
              Annuler
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
