export type Color = 'primary' | 'secondary';
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
      return 'text-primary-700';
    case 'secondary':
      return 'text-secondary-700';
    default:
      return 'text-primary-700';
  }
};
