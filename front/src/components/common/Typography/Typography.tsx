import React from 'react';

import { HTMLTags, HTMLTagToVariantMapping, Variant } from './const';
import {
  Color,
  getActiveColor,
  getColor,
  getDesktopFontWeight,
  getDesktopTextSize,
  getFontFamily,
  getFontWeight,
  getIncreasedTextSize,
  getNoWrap,
  getTextTransform,
  getTruncate,
  TextSize,
  Transform,
  Weight,
} from './style/typography.style';
import clsxm from '@/utils/clsxm';

type LineHeight =
  | 'leading-3'
  | 'leading-4'
  | 'leading-5'
  | 'leading-6'
  | 'leading-7'
  | 'leading-8'
  | 'leading-9'
  | 'leading-10'
  | 'leading-none'
  | 'leading-tight'
  | 'leading-snug'
  | 'leading-normal'
  | 'leading-relaxed'
  | 'leading-loose';

export interface ITypographyProps {
  children: React.ReactNode;
  tag?: HTMLTags;
  size?: TextSize | `text-${string}`;
  desktopSize?: TextSize | `md:text-${string}`;
  lineHeight?: LineHeight;
  variant?: Variant;
  color?: Color;
  colorGradient?: string;
  weight?: Weight;
  desktopWeight?: Weight;
  italic?: boolean;
  transform?: Transform;
  underline?: boolean;
  activeColor?: Color;
  textPosition?: 'text-left' | 'text-center' | 'text-right';
  truncate?: boolean;
  noWrap?: boolean;
  onClick?: () => void;
  family?: 'roboto' | 'marianne';
  opacity?: `opacity-${string}`;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  tag,
  color = 'primary',
  colorGradient = '600',
  size = 'text-sm',
  desktopSize,
  lineHeight = 'leading-normal',
  children,
  weight = 'normal',
  desktopWeight,
  italic = false,
  underline = false,
  activeColor,
  textPosition,
  truncate = false,
  transform,
  noWrap = false,
  onClick,
  family = 'roboto',
  opacity,
}) => {
  let usedVariant = variant;
  if (usedVariant === null) {
    usedVariant = tag && tag in HTMLTagToVariantMapping ? HTMLTagToVariantMapping[tag] : 'body1';
  }

  const className = clsxm({
    // [`${usedVariant}`]: true,
    // hidden: true,
    [getFontWeight(weight)]: true,
    [desktopWeight ? getDesktopFontWeight(desktopWeight) : '']: true,
    [getColor(color, colorGradient)]: true,
    [getActiveColor(activeColor)]: activeColor,
    // [size]: true,
    [getIncreasedTextSize(size)]: true,
    [desktopSize ? getDesktopTextSize(desktopSize) : '']: desktopSize,
    [lineHeight]: true,
    italic,
    underline,
    [`${textPosition}`]: true,
    [getTruncate(truncate)]: truncate,
    [getTextTransform(transform)]: transform,
    [getNoWrap(noWrap)]: noWrap,
    [getFontFamily(family)]: family,
    [opacity || '']: true,
  });
  const CustomTag = tag ?? 'span';

  return (
    <CustomTag onClick={onClick} className={className} data-testid="typography-element">
      {children}
    </CustomTag>
  );
};
