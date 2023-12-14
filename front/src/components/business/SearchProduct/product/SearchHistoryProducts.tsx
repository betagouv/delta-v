import React from 'react';

import { SearchProductHistoryItem } from '@/api/lib/products';
import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';

interface SearchHistoryProductsProps {
  history: SearchProductHistoryItem[];
  onClickProduct: (product: SearchProductHistoryItem) => void;
}

export const SearchHistoryProducts: React.FC<SearchHistoryProductsProps> = ({
  history,
  onClickProduct,
}: SearchHistoryProductsProps) => {
  return (
    <>
      {history.length > 0 ? (
        <ul className="w-full text-base">
          <Typography color="black" size="text-base">
            Historique des recherches
          </Typography>
          {history.map((historyItem) => {
            return (
              <li
                key={historyItem.id}
                className="flex cursor-default select-none items-center px-3 pt-3 leading-3"
                data-testid="result-product-search-element"
                onClick={() => onClickProduct(historyItem)}
              >
                <div className="flex items-center gap-3">
                  <span className="mb-1 text-blue-700">
                    <Icon name="search" size="base" />
                  </span>
                  <span>
                    {historyItem.name && (
                      <React.Fragment>
                        <Typography color="black" size="text-base">
                          {historyItem.name}
                        </Typography>
                        <Typography color="light-gray" size="text-base">
                          {' '}
                          dans{' '}
                        </Typography>
                        <Typography size="text-base">
                          <span className="text-blue-700">{historyItem.name}</span>
                        </Typography>
                      </React.Fragment>
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};
