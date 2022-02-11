import cn from 'classnames';
import React from 'react';

import { getButtonStyle } from './style/button.style';
import { getIconStyle } from './style/icon.style';

interface IOptionalProps {
  as?: any;
  href?: string;
  target?: string;
  to?: string;
  rel?: string;
  onClick?: () => void;
}

export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type ButtonVariant = 'normal' | 'outlined' | 'ghost';
export type ButtonColor = 'primary' | 'secondary';
export type IconPosition = 'left' | 'right';

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
  autoWidth?: boolean;
  variant?: ButtonVariant;
  uppercase?: boolean;
  disabled?: boolean;
  loading?: boolean;
  mobileVariant?: 'icon' | 'fullWidth';
  type?: 'button' | 'submit';
  external?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  href,
  to,
  onClick,
  color = 'primary',
  size = 'base',
  className = {},
  icon,
  iconPosition = 'right',
  variant = 'normal',
  disabled = false,
  loading = false,
  type = 'button',
  external,
  children,
}: IButtonProps) => {
  const buttonProps: IOptionalProps = {};

  if (href) {
    buttonProps.as = 'a';
    buttonProps.href = href;
    if (external) {
      buttonProps.target = '_blank';
      buttonProps.rel = 'noopener noreferrer';
    }
  } else if (to) {
    buttonProps.to = to;
  }

  const buttonDisabled = disabled || loading;

  const customButtonClassName = getButtonStyle({
    color,
    variant,
    size,
    iconPosition,
    disabled: buttonDisabled,
  });
  const customIconClassName = getIconStyle({
    size,
    position: iconPosition,
    loading,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={buttonDisabled}
      className={cn({ ...customButtonClassName, ...className })}
    >
      <span>{children}</span>
      {icon && !loading && <div className={cn(customIconClassName)}>Icon</div>}
      {loading && <div className={cn(customIconClassName)}>Icon</div>}
    </button>
  );
};
