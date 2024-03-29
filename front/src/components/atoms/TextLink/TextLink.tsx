import React from 'react';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { Typography } from '../Typography';

interface TextLinkProps {
  back?: boolean;
  to?: string;
  href?: string;
  onClick?: () => any;
  external?: boolean;
  underline?: boolean;
  bold?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
}

export const TextLink: React.FC<TextLinkProps> = ({
  back,
  to,
  href,
  onClick,
  external = false,
  underline = false,
  bold = false,
  withArrow = false,
  children,
}: TextLinkProps) => {
  return (
    <div className="active:bg-primary-600 w-fit">
      <Typography
        weight={bold ? 'bold' : 'normal'}
        variant="body1"
        tag="div"
        color="link"
        activeColor="white"
        underline={underline}
        lineHeight="leading-tight"
        desktopSize="text-xs"
      >
        <Link to={to} href={href} external={external} back={back} onClick={onClick}>
          <div className="flex flex-row gap-1">
            {children}
            {withArrow && (
              <div className="h-3.5 w-3.5">
                <Icon name="arrow-right" />
              </div>
            )}
          </div>
        </Link>
      </Typography>
    </div>
  );
};
