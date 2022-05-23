import React from 'react';

import cn from 'classnames';

import { HTMLTags, HTMLTagToVariantMapping, Variant } from './const';
import { Color, getColor, getFontWeight, Weight } from './style/typography.style';

export interface ITypographyProps {
  children: React.ReactNode;
  tag?: HTMLTags;
  variant?: Variant;
  color?: Color;
  weight?: Weight;
  onClick?: () => void;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  tag,
  color = 'primary',
  children,
  weight = 'normal',
  onClick,
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
    <CustomTag onClick={onClick} className={className} data-testid="typography-element">
      {children}
    </CustomTag>
  );
};
