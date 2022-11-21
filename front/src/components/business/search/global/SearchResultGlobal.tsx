import { Link } from '@/components/common/Link';
import { Typography } from '@/components/common/Typography';
import { SearchData } from '@/services/search.service';
import { SearchType } from '@/utils/search';

interface SearchResultGlobalProps {
  resultSearch: SearchType<SearchData>[];
}

const BoldedText = (value: string, position: [number, number]) => {
  const strBefore = value.slice(0, position[0]);
  const boldValue = value.slice(position[0], position[1]);
  const strAfter = value.slice(position[1], value.length);
  return (
    <span>
      {strBefore}
      <span className="font-bold">{boldValue}</span>
      {strAfter}
    </span>
  );
};

export const SearchResultGlobal: React.FC<SearchResultGlobalProps> = ({
  resultSearch,
}: SearchResultGlobalProps) => {
  return (
    <ul className="w-full text-base">
      {resultSearch.map((resultElement) => (
        <Link to={resultElement.path}>
          <li
            key={resultElement.id}
            className="flex cursor-default select-none items-center py-2 px-3"
            data-testid="result-product-search-element"
          >
            <div className="flex flex-col">
              <Typography
                color="light-gray"
                size="text-sm"
                lineHeight="leading-normal"
                weight="light"
              >
                {resultElement.pageTitle}
              </Typography>
              <Typography
                color="secondary"
                size="text-base"
                lineHeight="leading-normal"
                weight="medium"
              >
                {resultElement.question}
              </Typography>
              <Typography
                color="secondary"
                size="text-sm"
                lineHeight="leading-tight"
                weight="light"
              >
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
