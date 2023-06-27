import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { SvgIcon, SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import { Product } from '@/model/product';

require('dayjs/locale/fr');

dayjs.locale('fr');

export type NomenclatureCardProps = {
  product: Product;
  onClick?: (product: Product) => void;
};

export const NomenclatureCard = ({ product, onClick }: NomenclatureCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const onFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={cs(
        'relative grid rounded-xl border border-secondary-300 grid-cols-[95px_1fr] w-full h-28 p-3',
      )}
      onClick={onClick ? () => onClick(product) : undefined}
    >
      <div className="grid-rows-1 flex flex-col justify-center items-center">
        <div className="h-12 w-12 flex justify-self-center">
          <SvgIcon name={product.icon ?? 'categoryOther'} />
        </div>
      </div>

      <div className="grid-rows-1 overflow-hidden">
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
        className="absolute top-2 right-2 h-5 w-5 cursor-pointer text-[#5A7BF0]"
        onClick={onFavoriteClick}
      >
        {isFavorite ? <SvgIcon name="starFull" /> : <SvgIcon name="star" />}
      </div>
    </div>
  );
};
