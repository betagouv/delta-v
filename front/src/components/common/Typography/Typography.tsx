import React from 'react';

import cn from 'classnames';
import Link from 'next/link';

import { HTMLTags, HTMLTagToVariantMapping, Variant } from './const';
import { Color, getColor, getFontWeight, Weight } from './style/typography.style';

export interface ITypographyProps {
  children: React.ReactNode;
  tag?: HTMLTags;
  variant?: Variant;
  color?: Color;
  weight?: Weight;
  to?: string;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  tag,
  color = 'primary',
  children,
  weight = 'normal',
  to,
}) => {
  let usedVariant = variant;
  if (usedVariant === null) {
    usedVariant = tag && tag in HTMLTagToVariantMapping ? HTMLTagToVariantMapping[tag] : 'body1';
  }

  const className = cn({
    [`${usedVariant}`]: true,
    [getFontWeight(weight)]: true,
    [getColor(color)]: color === 'primary',
  });
  const CustomTag = tag ?? 'p';

  return (
    <>
      {to ? (
        <Link href={to}>
          <a>
            <CustomTag className={className}>{children}</CustomTag>
          </a>
        </Link>
      ) : (
        <CustomTag className={className}>{children}</CustomTag>
      )}
    </>
  );
};
