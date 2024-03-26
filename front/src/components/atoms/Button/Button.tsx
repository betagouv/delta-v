import React from 'react';

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
import clsxm from '@/utils/clsxm';

export interface IButtonProps {
  children?: any;
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
  fullHeight?: boolean;
  loading?: boolean;
  mobileVariant?: 'icon' | 'fullWidth';
  type?: 'button' | 'submit';
  external?: boolean;
  iconClassname?: string;
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
  fullHeight = false,
  loading = false,
  type = 'button',
  children,
  iconClassname,
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
    fullHeight,
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
      className={clsxm({
        'min-w-[120px]': size !== '2xs',
        ...customButtonClassName,
        ...className,
      })}
    >
      {children && <span>{children}</span>}
      {icon && !loading && (
        <div className={clsxm(customIconClassName, iconClassname)}>
          <Icon name={icon} />
        </div>
      )}
      {loading && (
        <div className={clsxm(customIconClassName)}>
          <Icon name="spinner1" />
        </div>
      )}
    </button>
  );
};
