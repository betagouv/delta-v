import React from 'react';

import IcoMoon from 'react-icomoon';

import iconSet from './selection.json';

export interface IIconProps {
  color?: string;
  name: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Icon: React.FC<IIconProps> = ({ color, name, onClick }) => {
  return <IcoMoon onClick={onClick} iconSet={iconSet} icon={name} color={color} />;
};
