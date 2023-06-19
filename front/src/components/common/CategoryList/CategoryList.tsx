import React from 'react';

import cs from 'classnames';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';
import { TitleAgent } from '../TitleAgent';
import { RadioCardElement } from '@/components/input/StandardInputs/RadioCard/RadioCardElement';

export interface Item {
  title: string;
  svgNames: SvgNames;
  id: string;
}

export interface CategoryListProps {
  title?: string;
  items: Item[];
  onSelectProduct: (id: string) => void;
  displayType?: 'list' | 'card';
  fullWidth?: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  items,
  title,
  onSelectProduct,
  displayType = 'list',
  fullWidth,
}: CategoryListProps) => {
  return (
    <ul role="list">
      {title && (
        <li className="flex py-1 text-sm">
          <TitleAgent title={title} />
        </li>
      )}
      <div
        className={cs({
          'flex flex-row ': true,
          'grid grid-cols-3 gap-2 mt-6': displayType === 'card',
          'flex-col': displayType === 'list',
        })}
      >
        {items.map((item, index) =>
          displayType === 'card' ? (
            <div>
              <RadioCardElement
                value={item.title}
                svgIcon={item.svgNames}
                onClick={() => onSelectProduct(item.id)}
                fullWidth={fullWidth}
              />
            </div>
          ) : (
            <>
              <li
                key={index}
                className="flex cursor-pointer flex-row items-center gap-2 py-3"
                onClick={() => onSelectProduct(item.id)}
              >
                <div className="flex h-6 w-6 items-center">
                  <SvgIcon name={item.svgNames} />
                </div>
                <div className="ml-2 flex-1 text-base">{item.title}</div>
                <div className="w-4 place-content-center">
                  <Icon name="chevron-right" />
                </div>
              </li>
              <div className="border-b border-b-gray-200" />
            </>
          ),
        )}
      </div>
    </ul>
  );
};
