import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { Icon } from '@/components/common/Icon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type NomenclatureCardProps = {
  product: Product;
};

export const NomenclatureCard = ({ product }: NomenclatureCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={cs(
        'relative grid rounded-xl border border-gray-200 grid-cols-[40px_1fr] w-full h-28 p-3',
      )}
    >
      <div className="h-7 w-7 bg-gray-200" />
      <div className="grid-rows-[1fr_3fr]">
        <div className="flex flex-row gap-6">
          {product.nomenclatures &&
            product.nomenclatures.map((item, index) => (
              <Typography key={index} color="middle-gray">
                {item}
              </Typography>
            ))}
        </div>
        <div className="flex flex-col line-clamp-3">
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.name}
          </Typography>
          <Typography color="black" transform="sentence-case" size="text-base">
            {product.relatedWords.map((item) => item).join(', ')}
          </Typography>
        </div>
      </div>
      <div
        className="absolute top-2 right-2 h-4 w-4 cursor-pointer text-[#5A7BF0]"
        onClick={handleClick}
      >
        {isFavorite ? (
          <Icon name="star-full" color="#5A7BF0" />
        ) : (
          <Icon name="star-empty" color="grey" />
        )}
      </div>
    </div>
  );
};
