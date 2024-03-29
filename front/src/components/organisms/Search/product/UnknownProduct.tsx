import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';

interface UnknownProductProps {
  searchValue: string;
}

export const UnknownProduct: React.FC<UnknownProductProps> = ({
  searchValue,
}: UnknownProductProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4" data-testid="empty-result-product-search-element">
      <div className="flex flex-col gap-6 px-4">
        <Typography color="secondary" size="text-lg">
          Cette marchandise n’est pas encore référencée.
        </Typography>
        <Typography color="secondary" size="text-lg">
          Notre application s’améliore de jour en jour et la liste des produits s’enrichira
          prochainement.
        </Typography>
        <Typography color="secondary" size="text-lg">
          Vous pouvez enregistrer vous-même ce produit dans votre simulation ou annuler votre
          recherche.
        </Typography>
      </div>
      <div className="flex-1" />

      <div className=" flex w-full flex-col items-center">
        <div className="flex w-60 flex-col gap-4">
          <Link to={`./ajout?searchValue=${searchValue}`}>
            <Button fullWidth>Enregistrer le produit</Button>
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
