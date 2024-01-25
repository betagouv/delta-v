import React from 'react';

import IcoMoon from 'react-icomoon';

import { ButtonSize } from '../Button/style/button.style';
import { getIconSize } from '../Button/style/icon.style';
import iconSet from './selection.json';

export interface IIconProps {
  color?: string;
  name: string;
  style?: React.CSSProperties;
  size?: ButtonSize;
  onClick?: () => void;
}

const getIcomoonColor = (color?: string): string | undefined => {
  switch (color) {
    case 'primary':
      return '#000091';
    case 'secondary':
      return '#161616';
    case 'disabled':
      return '#D9D9D9';
    case 'cancel':
      return '#dc2626';
    case 'link':
      return '#6A6AF4';
    case 'lightBlue':
      return '#E3E3FD';
    case 'success':
      return '#18753C';
    case 'note':
      return '#FFEA79';
    default:
      return color;
  }
};

export const Icon: React.FC<IIconProps> = ({ color, name, onClick, size }) => {
  const customSize = getIconSize({
    size,
  });
  return (
    <IcoMoon
      onClick={onClick}
      iconSet={iconSet}
      icon={name}
      color={getIcomoonColor(color)}
      size={customSize}
    />
  );
};
