export type TextSize =
  | 'text-2xs'
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl'
  | string;

export type Color =
  | 'primary'
  | 'secondary'
  | 'defaultText'
  | 'red'
  | 'white'
  | 'middle-gray'
  | 'light-gray'
  | 'link'
  | 'success'
  | 'error'
  | 'black';
export type Weight = 'thin' | 'light' | 'normal' | 'medium' | 'bold' | 'extrabold';

export type Transform = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case' | 'sentence-case';

export const getFontWeight = (weight: Weight): string => {
  switch (weight) {
    case 'thin':
      return 'font-thin';
    case 'light':
      return 'font-light';
    case 'normal':
      return 'font-normal';
    case 'medium':
      return 'font-medium';
    case 'bold':
      return 'font-bold';
    case 'extrabold':
      return 'font-extrabold';
    default:
      return 'font-normal';
  }
};

export const getColor = (color: Color, colorGradient?: string): string => {
  switch (color) {
    case 'primary':
      switch (colorGradient) {
        case '100':
          return 'text-primary-100';
        case '200':
          return 'text-primary-200';
        case '300':
          return 'text-primary-300';
        case '400':
          return 'text-primary-400';
        case '500':
          return 'text-primary-500';
        case '600':
          return 'text-primary-600';
        case '700':
          return 'text-primary-700';
        case '800':
          return 'text-primary-800';
        case '900':
          return 'text-primary-900';
        default:
          return 'text-primary-600';
      }
    case 'secondary':
      switch (colorGradient) {
        case '100':
          return 'text-secondary-100';
        case '200':
          return 'text-secondary-200';
        case '300':
          return 'text-secondary-300';
        case '400':
          return 'text-secondary-400';
        case '500':
          return 'text-secondary-500';
        case '600':
          return 'text-secondary-600';
        case '700':
          return 'text-secondary-700';
        case '800':
          return 'text-secondary-800';
        case '900':
          return 'text-secondary-900';
        default:
          return 'text-secondary-800';
      }
    case 'red':
      return 'text-red-600';
    case 'white':
      return 'text-white';
    case 'light-gray':
      return 'text-gray-400';
    case 'middle-gray':
      return 'text-gray-500';
    case 'link':
      return 'text-link';
    case 'success':
      return 'text-success';
    case 'error':
      return 'text-error';
    case 'black':
      return 'text-black';
    default:
      return 'text-primary-700';
  }
};

export const getActiveColor = (color?: Color): string => {
  switch (color) {
    case 'primary':
      return 'active:text-primary-600';
    case 'secondary':
      return 'active:text-secondary-800';
    case 'white':
      return 'active:text-white';
    case 'light-gray':
      return 'active:text-gray-400';
    case 'middle-gray':
      return 'active:text-gray-500';
    case 'link':
      return 'active:text-link';
    case 'success':
      return 'active:text-success';
    case 'error':
      return 'active:text-[#CE0500]';
    default:
      return '';
  }
};

export const getTruncate = (truncate?: boolean): string => {
  if (truncate) {
    return 'truncate';
  }
  return '';
};

export const getTextTransform = (transform?: Transform): string => {
  if (transform === 'sentence-case') {
    return 'first-letter:uppercase';
  }
  return transform ?? '';
};

export const getIncreasedTextSize = (size: TextSize): string => {
  switch (size) {
    case 'text-2xs':
      return 'text-xs';
    case 'text-xs':
      return 'text-sm';
    case 'text-sm':
      return 'text-base';
    case 'text-base':
      return 'text-lg';
    case 'text-lg':
      return 'text-xl';
    case 'text-xl':
      return 'text-2xl';
    case 'text-2xl':
      return 'text-3xl';
    case 'text-3xl':
      return 'text-4xl';
    default:
      return size;
  }
};
