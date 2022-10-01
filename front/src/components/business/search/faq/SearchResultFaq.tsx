import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { SearchData } from '@/services/search.service';
import { Routing } from '@/utils/const';
import { SearchType } from '@/utils/search';

interface SearchResultProductsProps {
  resultSearch: SearchType<SearchData>[];
}

const BoldedText = (value: string, position: [number, number]) => {
  const strBefore = value.slice(0, position[0]);
  const boldValue = value.slice(position[0], position[1]);
  const strAfter = value.slice(position[1], value.length);
  return (
    <span>
      {strBefore}
      <strong>{boldValue}</strong>
      {strAfter}
    </span>
  );
};

export const SearchResultFaq: React.FC<SearchResultProductsProps> = ({
  resultSearch,
}: SearchResultProductsProps) => {
  return (
    <ul className="w-full text-base">
      {resultSearch.map((resultElement) => (
        <Link to={`${Routing.faq}?id=${resultElement.id}`}>
          <li
            key={resultElement.id}
            className="flex cursor-default select-none items-center py-2 px-3"
            data-testid="result-product-search-element"
          >
            <div className="flex flex-col">
              <Typography color="secondary" size="text-sm" lineHeight="leading-normal" italic>
                {resultElement.question}
              </Typography>
              <Typography color="light-gray" size="text-xs" lineHeight="leading-tight">
                {resultElement.rankedPosition
                  ? BoldedText(resultElement.rankedValue, resultElement.rankedPosition)
                  : resultElement.rankedValue}
              </Typography>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};
