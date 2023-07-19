import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface IBreadcrumbsProps {
  categoryProducts: string[];
  limit?: number;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({
  categoryProducts,
  limit,
}: IBreadcrumbsProps) => {
  const displayedCategoryProducts =
    limit && categoryProducts.length > limit
      ? ['...', ...categoryProducts.slice(categoryProducts.length - limit, categoryProducts.length)]
      : categoryProducts;
  return (
    <div className="flex flex-row items-center gap-[10px] pr-4">
      {displayedCategoryProducts.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className="max-w-[85px] flex flex-row items-center gap-[10px] line-clamp-2"
            >
              <Typography color="secondary" size="text-2xs">
                {item}
              </Typography>
            </div>
            {index !== displayedCategoryProducts.length - 1 && (
              <Icon name="chevron-right" size="xs" />
            )}
          </>
        );
      })}
    </div>
  );
};
