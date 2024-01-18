import React from 'react';

import cs from 'classnames';
import { useMediaQuery } from 'react-responsive';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { Product } from '@/model/product';
import { TailwindDefaultScreenSize } from '@/utils/enums';

export interface IBreadcrumbsProps {
  categoryProducts: Product[];
  limit?: number;
  onClickLink?: (id: string) => void;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({
  categoryProducts,
  limit,
  onClickLink,
}: IBreadcrumbsProps) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${TailwindDefaultScreenSize.TABLET})`,
  });
  const displayedCategoryProducts =
    limit && categoryProducts.length > limit
      ? [...categoryProducts.slice(categoryProducts.length - limit, categoryProducts.length)]
      : categoryProducts;
  return (
    <div className="flex flex-row flex-wrap items-center gap-x-[10px] pr-4">
      {displayedCategoryProducts.map((item, index) => {
        return (
          <>
            <div
              key={index}
              className={cs({
                'max-w-[85px] flex flex-row items-center gap-[10px] line-clamp-1': true,
                'cursor-pointer': onClickLink,
              })}
              onClick={() => onClickLink && onClickLink(item.id)}
            >
              <Typography color="middle-gray" size={isMobile ? 'text-2xs' : 'text-xs'}>
                {item.name}
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
