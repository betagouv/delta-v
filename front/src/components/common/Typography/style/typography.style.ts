export type Color =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'middle-gray'
  | 'light-gray'
  | 'link'
  | 'success'
  | 'error'
  | 'black';
export type Weight = 'thin' | 'light' | 'normal' | 'medium' | 'bold' | 'extrabold';

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

export const getColor = (color: Color): string => {
  switch (color) {
    case 'primary':
      return 'text-primary-600';
    case 'secondary':
      return 'text-secondary-800';
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
      return 'text-[#CE0500]';
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
