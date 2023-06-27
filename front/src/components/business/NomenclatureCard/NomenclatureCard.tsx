import React, { useState } from 'react';

import cs from 'classnames';
import dayjs from 'dayjs';

import { SvgIcon } from '@/components/common/SvgIcon';
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
        'relative grid rounded-lg border border-secondary-300 grid-cols-[40px_1fr] md:w-72 p-5 gap-5',
      )}
      onClick={onClick ? () => onClick(product) : undefined}
    >
      <div className="justify-center flex items-center">
        <SvgIcon name={product.icon ?? 'categoryOther'} />
      </div>

      <div>
        <Typography color="black" transform="sentence-case" size="text-xs">
          {product.name}
        </Typography>
        <div className="flex flex-row gap-2.5">
          {product.nomenclatures &&
            product.nomenclatures.map((item, index) => (
              <Typography key={index} color="primary" weight="thin" size="text-xs">
                {item}
              </Typography>
            ))}
        </div>
        <div className="flex flex-col line-clamp-2">
          <Typography color="black" transform="sentence-case" size="text-sm">
            {product.relatedWords.map((item) => item).join(', ')}
          </Typography>
        </div>
      </div>
      <div className="absolute top-2.5 right-2.5 h-5 w-5 cursor-pointer" onClick={onFavoriteClick}>
        {isFavorite ? <SvgIcon name="starFull" /> : <SvgIcon name="star" />}
      </div>
    </div>
  );
};
