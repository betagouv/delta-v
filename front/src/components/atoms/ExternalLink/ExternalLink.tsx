import React from 'react';

import classNames from 'classnames';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  withBorder?: boolean;
  tag?: 'div' | 'span';
}

export const ExternalLink: React.FC<LinkProps> = ({
  href,
  children,
  tag,
  withBorder = false,
}: LinkProps) => {
  const CustomTag = tag ?? 'div';

  return (
    <CustomTag
      className={classNames({
        'rounded-md border border-black p-2': withBorder,
      })}
    >
      <NextLink href={href} target="_blank">
        {children}
      </NextLink>
    </CustomTag>
  );
};
