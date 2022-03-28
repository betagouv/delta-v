export type ColorValues = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'white';

type ColorAlternativeValues =
  | 'black'
  | 'error'
  | 'success'
  | 'green'
  | 'grey'
  | 'darkGrey'
  | 'darkerGrey';

export type ColorDefaultValue = 'initial';

export type ColorExtendedValues = ColorValues | ColorAlternativeValues;
