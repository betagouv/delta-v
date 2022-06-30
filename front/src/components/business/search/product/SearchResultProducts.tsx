import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<Product>[];
}

export const SearchResultProducts: React.FC<SearchResultProductsProps> = ({
  resultSearch,
}: SearchResultProductsProps) => {
  return (
    <ul className="w-full text-base">
      {resultSearch.map((resultElement) => (
        <Link key={resultElement.id} to={`/simulateur/produits/${resultElement.id}`}>
          <li
            className="flex cursor-default select-none items-center py-2 px-3"
            data-testid="result-product-search-element"
          >
            <div className="flex flex-col">
              <Typography color="secondary" size="text-lg" lineHeight="leading-none">
                {resultElement.rankedValue}
              </Typography>
            </div>
            <div className="flex-1" />
            <input
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              className="flex h-6 w-6 items-center rounded border-gray-500 pr-4 text-primary-600"
            />
          </li>
        </Link>
      ))}
    </ul>
  );
};
