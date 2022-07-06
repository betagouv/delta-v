import React from 'react';

import { useRouter } from 'next/router';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';

export interface Item {
  title: string;
  svgNames: SvgNames;
  to: string;
}

export interface CategoryListProps {
  title?: string;
  items: Item[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ items, title }: CategoryListProps) => {
  const router = useRouter();
  return (
    <ul role="list" className="flex flex-1 flex-col">
      {title && <li className="flex py-1 text-sm">{title}</li>}
      {items.map((item, index) => (
        <>
          <li
            key={index}
            className="flex cursor-pointer flex-row gap-2 py-3"
            onClick={() => router.push(item.to)}
          >
            <div className="h-6 w-6">
              <SvgIcon name={item.svgNames} />
            </div>
            <div className="ml-2 flex-1 text-base">{item.title}</div>
            <div className="w-4 place-content-center">
              <Icon name="chevron-thin-right" />
            </div>
          </li>
          <div className="border-b border-b-gray-200" />
        </>
      ))}
    </ul>
  );
};
