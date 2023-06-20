import React from 'react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface IBreadcrumbsProps {
  categoryProducts: string[];
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({
  categoryProducts,
}: IBreadcrumbsProps) => {
  return (
    <div className="flex flex-row items-center gap-[10px]">
      {categoryProducts.map((item, index) => {
        return (
          <div key={index} className="flex flex-row items-center gap-[10px]">
            <Typography color="secondary" size="text-2xs">
              {item}
            </Typography>
            {index !== categoryProducts.length - 1 && <Icon name="chevron-right" size="xs" />}
          </div>
        );
      })}
    </div>
  );
};
