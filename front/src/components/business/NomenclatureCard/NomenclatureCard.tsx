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
  isFavorite?: boolean;
  onClick?: (isFavorite: boolean) => void;
};

export const NomenclatureCard = ({
  product,
  isFavorite: initialIsFavorite,
  onClick,
}: NomenclatureCardProps) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (onClick) {
      onClick(!isFavorite);
    }
  };

  return (
    <div
      className={cs(
        'relative grid rounded-xl border border-gray-200 p-3 grid-cols-[40px_1fr] w-64 h-28',
      )}
    >
      <div className="h-7 w-7 bg-gray-200" />
      <div className="grid-rows-[1fr_3fr]">
        <div className="flex gap-3">
          {product.nomenclatures &&
            product.nomenclatures.map((item, index) => (
              <Typography key={index} color="middle-gray">
                {item}
              </Typography>
            ))}
        </div>
        <div className="line-clamp-3">
          <Typography color="black">{product.relatedWords.join(', ')}</Typography>
        </div>
      </div>
      <div
        className="absolute top-2 right-2 h-4 w-4 cursor-pointer text-[#5A7BF0]"
        onClick={handleClick}
      >
        {isFavorite ? <Icon name="star-full" /> : <Icon name="star-empty" color="grey" />}
      </div>
    </div>
  );
};
