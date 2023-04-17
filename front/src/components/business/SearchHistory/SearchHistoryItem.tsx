import React from 'react';

import { Icon } from '@/components/common/Icon';

export type SearchHistoryItemProps = {
  matchingValue?: string;
  product: string;
  category?: string;
};

export const SearchHistoryItem = ({ matchingValue, product, category }: SearchHistoryItemProps) => {
  const splitProduct = product.split(matchingValue || '');
  return (
    <div className="flex h-5 gap-3">
      <span className="text-blue-700">
        <Icon name="search" />
      </span>
      <span>
        {splitProduct.map((string, index) => (
          <React.Fragment key={index}>
            <span className="text-black">{string}</span>
            {index !== splitProduct.length - 1 && (
              <span className="font-bold">{matchingValue}</span>
            )}
          </React.Fragment>
        ))}
        {category && (
          <React.Fragment>
            <span className="text-gray-400"> dans </span>
            <span className="text-blue-700">{category}</span>
          </React.Fragment>
        )}
      </span>
    </div>
  );
};
