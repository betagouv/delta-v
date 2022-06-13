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

export const Icon: React.FC<IIconProps> = ({ color, name, onClick, size }) => {
  const customSize = getIconSize({
    size,
  });
  return (
    <IcoMoon onClick={onClick} iconSet={iconSet} icon={name} color={color} size={customSize} />
  );
};
