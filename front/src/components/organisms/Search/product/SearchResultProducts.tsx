import { useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';

import { Button } from '@/components/atoms/Button';
import { Link } from '@/components/atoms/Link';
import { Typography } from '@/components/atoms/Typography';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  searchValue: string;
  resultSearch: SearchType<Product>[];
  method?: 'declaration' | 'simulateur';
}

export const SearchResultProducts: React.FC<SearchResultProductsProps> = ({
  searchValue,
  resultSearch,
  method = 'simulateur',
}: SearchResultProductsProps) => {
  const router = useRouter();
  const { trackEvent } = useMatomo();
  const [productChecked, setProductChecked] = useState<string | undefined>();
  const onClickProduct = (searchProduct: SearchType<Product>) => {
    setProductChecked(searchProduct.id);

    trackEvent({
      category: 'user-action',
      action: 'click-result-search',
      name: `${searchProduct.name} - ${searchProduct.rankedValue}`,
    });
    setTimeout(() => {
      router.push(
        `/${method}/produits/${searchProduct.id}?customName=${searchProduct.rankedValue}`,
      );
    }, 250);
  };
  return (
    <>
      <ul className="w-full text-base">
        {resultSearch.map((resultElement) => (
          <li
            key={resultElement.id}
            className="flex cursor-default select-none items-center py-2 px-3"
            data-testid="result-product-search-element"
            onClick={() => onClickProduct(resultElement)}
          >
            <div className="flex flex-col">
              <Typography color="light-gray" size="text-sm" lineHeight="leading-normal" italic>
                {resultElement.name}
              </Typography>
              <Typography color="secondary" size="text-lg" lineHeight="leading-tight">
                {resultElement.rankedValue}
              </Typography>
            </div>
            <div className="flex-1" />
            <input
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              checked={resultElement.id === productChecked}
              className="mt-3 flex h-6 w-6 items-center rounded border-gray-500 pr-4 text-primary-600 focus:ring-transparent"
            />
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 px-4">
          <Typography color="secondary" size="text-lg">
            Aucun résultat ne semble correspondre à votre recherche.
          </Typography>
          <Typography color="secondary" size="text-lg">
            Ajouter votre achat en cliquant sur le bouton ci-dessous.
          </Typography>
        </div>
        <div className=" flex w-full flex-col items-center">
          <div className="flex w-60 flex-col">
            <Link to={`./ajout?searchValue=${searchValue}`}>
              <Button fullWidth>Enregistrer votre produit</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
