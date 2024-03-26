import React from 'react';

import cs from 'classnames';

import { Icon } from '../../atoms/Icon';
import { IconButtonWithTitle } from '../../atoms/IconButtonWithTitle';
import { TitleAgent } from '../../atoms/TitleAgent';
import { Typography } from '../../atoms/Typography';
import { SvgIcon, SvgNames } from '../SvgIcon';
import { RadioCardElement } from '@/components/input/StandardInputs/RadioCard/RadioCardElement';
import { Product } from '@/model/product';
import { checkIsFinalProduct } from '@/utils/product.util';

const getReturnButtonLabelDesktop = (productTree: Product[]) => {
  const currentProduct = productTree[0];
  const isFinalProduct = checkIsFinalProduct(currentProduct);

  if (isFinalProduct) {
    return productTree[2]?.name;
  }
  return productTree[1]?.name;
};

const getHeaderTitleDesktop = (productTree: Product[]) => {
  const currentProduct = productTree[0];
  const isFinalProduct = checkIsFinalProduct(currentProduct);
  const titleProduct = isFinalProduct ? productTree[1] : currentProduct;

  if (!titleProduct) {
    return null;
  }

  return (
    <>
      {titleProduct.icon && <SvgIcon name={titleProduct.icon} className="h-10" />}
      <Typography size="text-[26px]" color="black" weight="bold">
        {titleProduct.name}
      </Typography>
    </>
  );
};

const CategoryListHeaderMobile = ({
  productTree,
  onClick,
}: {
  productTree: Product[];
  onClick?: () => void;
}) => {
  if (productTree.length <= 0) {
    return <></>;
  }
  return (
    <div className="mt-7">
      <IconButtonWithTitle
        icon="chevron-left"
        title={productTree[0]?.name ?? ''}
        onClick={onClick}
      />
    </div>
  );
};

const CategoryListHeaderDesktop = ({
  productTree,
  onClick,
}: {
  productTree: Product[];
  onClick?: () => void;
}) => {
  if (productTree.length <= 0) {
    return null;
  }

  return (
    <>
      {productTree.length > 0 && (
        <>
          <div className="mb-[36px]">
            <div className="flex items-start w-full">
              <IconButtonWithTitle
                icon="chevron-left"
                title={getReturnButtonLabelDesktop(productTree) ?? 'Catégories'}
                onClick={onClick}
              />
            </div>
          </div>
          <div className="flex-col gap-4 items-center flex mb-10">
            {getHeaderTitleDesktop(productTree)}
          </div>
        </>
      )}
    </>
  );
};

export interface Item {
  title: string;
  svgNames: SvgNames;
  id: string;
}

export interface CategoryListProps {
  title?: string;
  items: Item[];
  onSelectProduct: (id: string) => void;
  onClick?: () => void;
  productTree?: Product[];
  displayType?: 'list' | 'card';
  bigSize?: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  items,
  title,
  onSelectProduct,
  onClick,
  productTree,
  displayType = 'list',
  bigSize,
}: CategoryListProps) => {
  return (
    <ul role="list">
      {title && bigSize && (
        <li className="flex py-1 text-sm">
          <TitleAgent title={title} />
        </li>
      )}

      {title && !bigSize && <li className="flex py-1 text-sm">{title}</li>}

      {productTree && (
        <>
          <span className="md:hidden block">
            <CategoryListHeaderMobile productTree={productTree} onClick={onClick} />
          </span>
          <span className="hidden md:block">
            <CategoryListHeaderDesktop productTree={productTree} onClick={onClick} />
          </span>
        </>
      )}
      <div
        className={cs({
          'grid grid-cols-3 gap-2 mt-5 justify-items-center md:flex md:flex-wrap md:gap-5 md:mt-10':
            displayType === 'card',
          'flex flex-col': displayType === 'list',
        })}
      >
        {items.map((item, index) =>
          displayType === 'card' ? (
            <div key={index}>
              <RadioCardElement
                value={item.title}
                svgIcon={item.svgNames}
                onClick={() => onSelectProduct(item.id)}
                bigSize={bigSize}
              />
            </div>
          ) : (
            <div key={index}>
              <li
                className="flex cursor-pointer flex-row items-center gap-2 py-3"
                onClick={() => onSelectProduct(item.id)}
              >
                <div className="flex h-6 w-6 items-center">
                  <SvgIcon name={item.svgNames} />
                </div>
                <div className="ml-2 flex-1 text-base">{item.title}</div>
                <div className="w-4 place-content-center">
                  <Icon name="chevron-right" size="sm" />
                </div>
              </li>
              <div className="border-b border-b-gray-200" />
            </div>
          ),
        )}
      </div>
    </ul>
  );
};
