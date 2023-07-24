import React from 'react';

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
  searchValue?: string;
};

export const renderMatchedWithSearch = (stringToChange: string, search: string): any => {
  if (!stringToChange.includes(search.toLocaleLowerCase())) {
    // return <span className="text-xs text-black">{product.rankedValue}</span>;
    return (
      <Typography color="black" size="text-base">
        {stringToChange}
      </Typography>
    );
  }

  const numberOccurrence = stringToChange.match(new RegExp(`(${search})`, 'gi')) ?? [];
  const matchValue = stringToChange.replace(new RegExp(`(${search})`, 'gi'), '_');
  const matchValues = matchValue.split('_');
  return numberOccurrence.map((item, i) => (
    <Typography color="black" size="text-base">
      {matchValues[i]}
      <span className="bg-primary-400 text-white">{item}</span>
      {matchValues[i + 1]}
    </Typography>
  ));
};

export const NomenclatureCard = ({ product, onClick, searchValue }: NomenclatureCardProps) => {
  return (
    <div
      className={cs(
        'relative grid rounded-lg border border-secondary-300 grid-cols-[40px_1fr] md:w-72 p-5 gap-5',
      )}
      onClick={onClick ? () => onClick(product) : undefined}
    >
      <div className="justify-center flex items-center z-10">
        <SvgIcon name={product.icon ?? 'categoryOther'} />
      </div>

      <div>
        {searchValue ? (
          <Typography color="black" transform="sentence-case" size="text-xs">
            {renderMatchedWithSearch(product.name, searchValue)}
          </Typography>
        ) : (
          <Typography color="black" transform="sentence-case" size="text-xs">
            {product.name}
          </Typography>
        )}
        <div className="flex flex-row gap-2.5">
          {product.nomenclatures &&
            product.nomenclatures.map((item, index) => (
              <Typography key={index} color="primary" weight="thin" size="text-xs">
                {item}
              </Typography>
            ))}
        </div>
        <div className="flex flex-col line-clamp-2">
          {searchValue ? (
            <Typography color="black" transform="sentence-case" size="text-sm">
              {renderMatchedWithSearch(
                product.relatedWords.map((item) => item).join(', '),
                searchValue,
              )}
            </Typography>
          ) : (
            <Typography color="black" transform="sentence-case" size="text-sm">
              {product.relatedWords.map((item) => item).join(', ')}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
