import React from 'react';

import cs from 'classnames';
import { useRouter } from 'next/router';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';
import { RadioCardElement } from '@/components/input/StandardInputs/RadioCard/RadioCardElement';

export interface Item {
  title: string;
  svgNames: SvgNames;
  to: string;
}

export interface CategoryListProps {
  title?: string;
  items: Item[];
  displayType?: 'list' | 'card';
}

export const CategoryList: React.FC<CategoryListProps> = ({
  items,
  title,
  displayType = 'list',
}: CategoryListProps) => {
  const router = useRouter();
  return (
    <ul role="list">
      {title && <li className="flex py-1 text-sm">{title}</li>}
      <div
        className={cs({
          'flex flex-row': true,
          'flex-row gap-4': displayType === 'card',
          'flex-col': displayType === 'list',
        })}
      >
        {items.map((item, index) =>
          displayType === 'card' ? (
            <div>
              <RadioCardElement
                value={item.title}
                svgIcon={item.svgNames}
                onClick={() => router.push(item.to)}
              />
            </div>
          ) : (
            <>
              <li
                key={index}
                className="flex cursor-pointer flex-row items-center gap-2 py-3"
                onClick={() => router.push(item.to)}
              >
                <div className="flex h-6 w-6 items-center">
                  <SvgIcon name={item.svgNames} />
                </div>
                <div className="ml-2 flex-1 text-base">{item.title}</div>
                <div className="w-4 place-content-center">
                  <Icon name="chevron-thin-right" />
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
