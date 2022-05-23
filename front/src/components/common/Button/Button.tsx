import React from 'react';

import cn from 'classnames';

import { Icon } from '../Icon';
import {
  ButtonColor,
  ButtonRounded,
  ButtonSize,
  ButtonVariant,
  getButtonStyle,
  IconPosition,
} from './style/button.style';
import { getIconStyle } from './style/icon.style';

export interface IButtonProps {
  children: any;
  className?: { [key: string]: boolean };
  href?: string;
  to?: string;
  as?: string;
  onClick?: () => void;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  rounded?: ButtonRounded;
  uppercase?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  mobileVariant?: 'icon' | 'fullWidth';
  type?: 'button' | 'submit';
  external?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  color = 'primary',
  size = 'base',
  className = {},
  icon,
  iconPosition = 'right',
  variant = 'normal',
  rounded = 'full',
  disabled = false,
  fullWidth = false,
  loading = false,
  type = 'button',
  children,
}: IButtonProps) => {
  const buttonDisabled = disabled || loading;

  const customButtonClassName = getButtonStyle({
    color,
    variant,
    size,
    iconPosition,
    rounded,
    disabled: buttonDisabled,
    fullWidth,
  });
  const customIconClassName = getIconStyle({
    size,
    position: iconPosition,
    loading,
  });

  return (
    <button
      data-testid="button-element"
      type={type}
      onClick={onClick}
      disabled={buttonDisabled}
      className={cn({ ...customButtonClassName, ...className })}
    >
      <span>{children}</span>
      {icon && !loading && (
        <div className={cn(customIconClassName)}>
          <Icon name={icon} />
        </div>
      )}
      {loading && (
        <div className={cn(customIconClassName)}>
          <Icon name="spinner1" />
        </div>
      )}
    </button>
  );
};
