import React from 'react';

import Link from 'next/link';

import { Icon } from '../Icon';
import { SvgIcon, SvgNames } from '../SvgIcon';

export interface Item {
  title: string;
  svgNames: SvgNames;
  href: string;
}

export interface CategoryListProps {
  title?: string;
  items: Item[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ items, title }: CategoryListProps) => {
  return (
    <ul role="list" className="flex flex-col divide-y divide-gray-200">
      {title && <li className="flex py-1 text-sm">{title}</li>}
      {items.map((item, index) => (
        <Link key={index} href={item.href}>
          <a>
            <li className="flex flex-row gap-2 py-3">
              <div className="h-6 w-6">
                <SvgIcon name={item.svgNames} />
              </div>
              <div className="ml-2 flex-1 text-base">{item.title}</div>
              <div className="w-4 place-content-center">
                <Icon name="chevron-thin-right" />
              </div>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};
