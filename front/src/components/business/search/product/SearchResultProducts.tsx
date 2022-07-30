import { useState } from 'react';

import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useRouter } from 'next/router';

import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<Product>[];
}

export const SearchResultProducts: React.FC<SearchResultProductsProps> = ({
  resultSearch,
}: SearchResultProductsProps) => {
  const router = useRouter();
  const { trackEvent } = useMatomo();
  const [productChecked, setProductChecked] = useState<string | undefined>();
  const onClickProduct = (searchproduct: SearchType<Product>) => {
    setProductChecked(searchproduct.id);

    trackEvent({
      category: 'user-action',
      action: 'click-result-search',
      name: `${searchproduct.name} - ${searchproduct.rankedValue}`,
    });
    setTimeout(() => {
      router.push(`/simulateur/produits/${searchproduct.id}`);
    }, 250);
  };
  return (
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
  );
};
