export type Variant = typeof variantStringList[number];

export const variantStringList = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'body3',
  'body4',
  'quote1',
  'quote2',
  'caption',
  'paragraph',
  'smallLabel',
  'inputLabel',
  'label',
  'labelStrong',
  'small',
  'div',
] as const;

export const tagStringList = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'blockquote',
  'caption',
  'label',
  'span',
  'th',
  'td',
  'small',
] as const;

export enum HTMLTagToVariantMapping {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'body1',
  a = 'body1',
  div = 'div',
  blockquote = 'quote1',
  caption = 'body1',
  label = 'label',
  span = 'label',
  th = 'body1',
  td = 'body1',
  small = 'small',
}

export type HTMLTags = keyof typeof HTMLTagToVariantMapping;
export type HTMLTextAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';
